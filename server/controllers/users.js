import jwt from 'jsonwebtoken';
import fs from 'fs';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import users from '../models/userdb';

const { pool } = users;
dotenv.config();

// console.log(process.env.secretKey);
/**
 * @class UserControllers
 */
class UserControllers {
  /**
   * @param {Object} req - Request
   * @param {Object} res - Response
   */
  static getUsers(req, res) {
    if (req.adminStatus) {
      try {
        pool.connect((err, client) => {
          const query = 'SELECT * FROM users';
          client.query(query, (err, result) => {
            // done();
            if (err) {
              res.status(422).json({ error: 'Unable to retrieve user' });
            }
            if (result.rows < 1) {
              res.status(404).send({
                status: 'Failed',
                message: 'No users information found',
              });
            } else {
              return res.json({
                message: result.rows
              });
            }
          });
        });
      } catch (err) {
        throw err;
      }
    } else {
      res.json({
        error: 'You are not permitted to view this'
      });
    }
  }

  /**
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @returns {json} user
   */
  static createUser(req, res) {

    const {
      firstname, lastname, othernames, username, email, phonenumber, password
    } = req.body;
    try {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;
          const passwordHash = hash;
          pool.connect((err, client) => {
            const query = `INSERT INTO users(firstname, lastname, othernames, username,
         email, phone, password, is_admin, registered) VALUES($1,$2,$3,$4,$5,$6,$7,$8,NOW()) RETURNING *`;
            const value = [firstname, lastname, othernames, username,
              email, phonenumber, passwordHash, false];
            client.query(query, value, (err, result) => {
              // client.query('SELECT * FROM users', (err2, result2) => {
              //   result2.rows.forEach((resultRows) => {
              //     const resultEmail = resultRows.email;

              //     if (resultEmail === email || resultRows.username) {
              //       return res.status(404).json({
              //         error: 'Email or username exists already'
              //       });
              //     }
              //   });
              // });
              if (err) {
                return res.status(422).json({ error: 'Unable to retrieve user' });
              }
              return res.json({
                message: result.rows,
                passHash: result.rows[0].password
              });
            });
          });
        });
      });
    } catch (err) {
      throw err;
    }
  }

  static loginUser(req, res) {
    const { password, username } = req.body;
    try {
      pool.connect((err, client, done) => {
        const query = 'SELECT * FROM users WHERE username=$1';
        const values = [username];
        client.query(query, values, (error, result) => {
          done();
          if (result.rowCount === 0 || err) {
            return res.json({
              message: 'Pls, enter a valid username'
            });
          }
          bcrypt.compare(password, result.rows[0].password).then(isMatch => {
            if (isMatch) {
              const admin = result.rows[0].is_admin;
              const id = result.rows[0].user_id;

              jwt.sign({ username, id, admin }, process.env.secretKey, { expiresIn: '20d' }, (err, token) => res.json({
                greeting:
                  `Welcome, ${username}`,
                token
                // Wrote the token to file so that it can be fetched from it
                // token: fs.writeFile('token.txt', token, (err) => {
                //   if (err) throw err;
                // }
              }));
              // jwt.sign({ username, password, admin }, process.env.secretKey, (err, token) => res.json({
              //   greeting: 'Welcome, User',
              //   // Wrote the token to file so that it can be fetched from it
              //   token: fs.writeFile('token.txt', token, (err) => {
              //     if (err) throw err;
              //   })
              // }));
            } else {
              res.status(400).json({
                err: 'password is not correct'
              })
            }
          });
        });
      });
    } catch (err) {
      throw err;
    }
  }
  static makeAdmin(req, res) {
    const id = parseInt(req.params.id, 10);
    const adminStatus = true;
    try {
      pool.connect((err, client) => {
        const query = `UPDATE users SET is_admin=${adminStatus} WHERE user_id=${id}`;
        client.query(query, (err) => {
          if (err) {
            res.status(422).json({ error: 'Unable to retrieve user' });
          } else {
            client.query(`SELECT * FROM reports WHERE id=${id}`, (err, results) => res.json({
              message: results.rows
            }));
          }
        });
      });
    } catch (err) {
      throw err;
    }
  }

  static getAUSer(req, res) {
    const id = parseInt(req.params.id, 10);
    console.log(req.adminStatus);
    if (req.adminStatus) {
      try {
        pool.connect((err, client) => {
          const query = `SELECT * FROM users WHERE user_id=${id}`;
          client.query(query, (err, result) => {
            // done();
            if (err) {
              res.status(422).json({ error: 'Unable to retrieve user' });
            }
            if (result.rows < 1) {
              res.status(404).send({
                status: 'Failed',
                message: 'No users information found',
              });
            } else {
              return res.json({
                message: result.rows
              });
            }
          });
        });
      } catch (err) {
        throw err;
      }
    } else {
      res.json({ message: 'You dont have the admin priviledge' });
    }
  }

  static getAReportUseer(req, res) {
    const id = parseInt(req.params.report_id, 10);
    if (req.adminStatus) {
      try {
        pool.connect((err, client) => {
          const query = `SELECT * FROM reports where placedby=${id};`;
          client.query(query, (err, result) => {
            // done();
            if (err) {
              res.status(422).json({ error: 'Unable to retrieve user' });
            }
            if (result.rows < 1) {
              res.status(404).send({
                status: 'Failed',
                message: 'No users information found',
              });
            } else {
              return res.json({
                success: 'True',
                message: result.rows
              });
            }
          });
        });
      } catch (err) {
        throw err;
      }
    } else {
      res.json({ message: 'No admin privilege' })
    }
  }

}
export default UserControllers;
