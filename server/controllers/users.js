import jwt from 'jsonwebtoken';
import fs from 'fs';
import dotenv from 'dotenv';
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

    pool.connect((err, client) => {
      const query = 'INSERT INTO users(firstname, lastname, othernames, username, email, phone, password, registered) VALUES($1,$2,$3,$4,$5,$6,$7,NOW()) RETURNING *';
      const value = [firstname, lastname, othernames, username, email, phonenumber, password];
      client.query(query, value, (err, result) => {
        if (err) {
          res.status(422).json({ error: 'Unable to retrieve user' });
        } else {
          res.json({
            message: result.rows
          });
        }
      });
    });
  }

  static loginUser(req, res) {
    const { password, username } = req.body;
    pool.connect((err, client, done) => {
      const query = 'SELECT * FROM users WHERE username=$1 AND password=$2';
      const values = [username, password];
      client.query(query, values, (error, result) => {
        done();
        if (result.rowCount === 0 || err) {
          return res.json({
            message: 'Pls, enter a valid username'
          });
        }

        jwt.sign({ username, password }, process.env.secretKey, (err, token) => res.json({
          result: 'Welcome',
          // Wrote the token to file so that it can be fetched from it
          token: fs.writeFile('token.txt', token, (err) => {
            if (err) throw err;
            console.log('finished');
          })
        }));
      });
    });
  }
}

export default UserControllers;
