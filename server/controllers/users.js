
import users from '../models/userdb';

class UserControllers {
  static getUsers(req, res) {
    return res.json({
      users
    });
  }

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
