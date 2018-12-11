
import users from '../models/userdb';

/**
 * @class UserControllers
 */
class UserControllers {
  /**
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @returns {json} users
   */
  static getUsers(req, res) {
    return res.json({
      users
    });
  }

  /**
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @returns {json} user
   */
  static createUser(req, res) {
    const {
      id, firstname, lastname, othernames, email, phonenumber, username, registered, isAdmin
    } = req.body;
    const user = {
      id,
      firstname,
      lastname,
      othernames,
      email,
      phonenumber,
      username,
      registered,
      isAdmin
    };
    users.push(user);
    return res.json({
      user,
      users
    });
  }
}

export default UserControllers;
