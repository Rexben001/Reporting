import jwt from 'jsonwebtoken';
import fs from 'fs';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import users from '../model/userdb';

const { pool } = users;

// import models from '../models';

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
    try {
      const query = 'SELECT * FROM users';
      pool.query(query, (err, result) => {
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

      // models.User.findAll()
      //   .then((user) => {
      //     res.status(200).json({
      //       status: 200,
      //       data: user
      //     });
      //   })
      //   .catch((e) => {
      //     // res.status(404).json({
      //     //   status: 404,
      //     //   message: e
      //     // });
      //     console.log(e)
      //   });
    } catch (err) {
      throw err;
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
          const query = `INSERT INTO users(firstname, lastname, othernames, username,
           email, phone, password, is_admin, registered) VALUES($1,$2,$3,$4,$5,$6,$7,$8,NOW()) RETURNING *`;
          const value = [firstname, lastname, othernames, username,
            email, phonenumber, passwordHash, false];
          pool.query(query, value, (err, result) => {
            if (err) {
              res.status(422).json({ error: 'Unable to retrieve user' });
            }
            if (result.rowCount === 0) {
              res.status(404).send({
                status: 'Failed',
                message: 'No users information found',
              });
            } else {
              return res.json({
                message: result.rows,
              });
            }
          });
          // models.User.create({
          //   firstname,
          //   lastname,
          //   othernames,
          //   email,
          //   password: passwordHash,
          //   username,
          //   phone: phonenumber,
          //   is_admin: false
          // }).then((user) => {
          //   res.status(201).json({
          //     status: 201,
          //     data: user
          //   });
          // })
          //   .catch((e) => {
          //     // res.status(404).json({
          //     //   status: 404,
          //     //   message: e
          //     // })
          //     console.log(e);
        });
      });
    } catch (err) {
      throw err;
    }
  }

  static loginUser(req, res) {
    const { password, username } = req.body;
    try {
      const query = 'SELECT * FROM users WHERE username=$1';
      const values = [username];
      pool.query(query, values, (error, result) => {
        if (result.rowCount === 0 || error) {
          return res.json({
            message: 'Pls, enter a valid username'
          });
        }
        bcrypt.compare(password, result.rows[0].password).then((isMatch) => {
          if (isMatch) {
            const admin = result.rows[0].is_admin;
            if (admin === true) {
              jwt.sign({ username, password, admin }, process.env.secretKey, (err, token) => res.status(200).json({
                greeting: 'Welcome, Admin',
                status: 200,
                // Wrote the token to file so that it can be fetched from it
                token: fs.writeFile('token.txt', token, (err) => {
                  if (err) throw err;
                })
              }));
            }

            jwt.sign({ username, password, admin }, process.env.secretKey, (err, token) => res.status(200).json({
              greeting: 'Welcome, User',
                              status: 200,

              // Wrote the token to file so that it can be fetched from it
              token: fs.writeFile('token.txt', token, (err) => {
                if (err) throw err;
              })
            }));
          } else {
            res.status(400).json({
              err: 'password is not correct'
            })
          }
        });
      });
    } catch (err) {
      throw err;
    }
  }
  static searchUser(req, res){
    if(typeof req.query.text !== 'undefined'){

    const search_string = req.query.text;
    pool.query(`SELECT * FROM users WHERE fts @@ to_tsquery('english', $1)`, [search_string], (err, result) =>{
      if(err) console.log(err);

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
    }else{
return res.json({
            message: 'Unable to search'
          });
    }
  }
}

export default UserControllers;
