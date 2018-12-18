import users from '../models/userdb';

const { pool } = users;

/**
 * @class UserControllers
 */
class UserControllers {
  /**
   * @param {Object} req - Request
   * @param {Object} res - Response
   */
  static getUsers(req, res) {
    pool.connect((client, done) => {
      const query = 'SELECT * FROM users';
      client.query(query, (err, result) => {
        done();
        if (err) {
          res.status(422).json({ error: 'Unable to retrieve user' });
        }
        if (result.rows < 1) {
          res.status(404).send({
            status: 'Failed',
            message: 'No users information found',
          });
        } else {
          res.json({
            message: 'Users Information retrieved',
            users: result.rows,
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
      firstname, lastname, othernames, username, email, phonenumber, password, registered
    } = req.body;
    // const user = {
    //   id,
    //   firstname,
    //   lastname,
    //   othernames,
    //   email,
    //   phonenumber,
    //   username,
    //   registered,
    //   isAdmin
    // };
    pool.connect((client, done) => {
      const query = 'INSERT INTO users(firstname, lastname, othernames, username, email, phone, password, registered) VALUES($1,$2,$3,$4,$5,$6,$7,NOW()) RETURNING *';
      const value = [firstname, lastname, othernames, username, email, phonenumber, password, registered];
      client.query(query, value, (err, result) => {
        done();
        if (err) {
          res.status(422).json({ error: 'Unable to retrieve user' });
        } else {
          res.json({
            message: result
          });
        }
      });
    });
  }
}

export default UserControllers;
