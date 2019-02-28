"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _fs = _interopRequireDefault(require("fs"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _userdb = _interopRequireDefault(require("../models/userdb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var pool = _userdb.default.pool;

_dotenv.default.config(); // console.log(process.env.secretKey);

/**
 * @class UserControllers
 */


var UserControllers =
/*#__PURE__*/
function () {
  function UserControllers() {
    _classCallCheck(this, UserControllers);
  }

  _createClass(UserControllers, null, [{
    key: "getUsers",

    /**
     * @param {Object} req - Request
     * @param {Object} res - Response
     */
    value: function getUsers(req, res) {
      try {
        var query = 'SELECT * FROM users';
        pool.query(query, function (err, result) {
          if (err) {
            res.status(422).json({
              error: 'Unable to retrieve user'
            });
          }

          if (result.rows < 1) {
            res.status(404).send({
              status: 'Failed',
              message: 'No users information found'
            });
          } else {
            return res.json({
              message: result.rows
            });
          }
        });
      } catch (err) {
        throw err;
      }
    }
    /**
     * @param {Object} req - Request
     * @param {Object} res - Response
     * @returns {json} user
     */

  }, {
    key: "createUser",
    value: function createUser(req, res) {
      var _req$body = req.body,
          firstname = _req$body.firstname,
          lastname = _req$body.lastname,
          othernames = _req$body.othernames,
          username = _req$body.username,
          email = _req$body.email,
          phonenumber = _req$body.phonenumber,
          password = _req$body.password,
          isAdmin = _req$body.isAdmin;

      try {
        _bcryptjs.default.genSalt(10, function (err, salt) {
          _bcryptjs.default.hash(password, salt, function (err, hash) {
            if (err) throw err;
            var passwordHash = hash;
            var query = "INSERT INTO users(firstname, lastname, othernames, username,\n         email, phone, password, is_admin, registered) VALUES($1,$2,$3,$4,$5,$6,$7,$8,NOW()) RETURNING *";
            var value = [firstname, lastname, othernames, username, email, phonenumber, passwordHash, isAdmin || false];
            pool.query(query, value, function (err, result) {
              if (err) {
                return res.status(422).json({
                  error: "Unable to retrieve user, ".concat(err)
                });
              }

              return res.json({
                message: result.rows,
                passHash: result.rows[0].password
              });
            });
          });
        });
      } catch (err) {
        throw err;
      }
    }
  }, {
    key: "loginUser",
    value: function loginUser(req, res) {
      var _req$body2 = req.body,
          password = _req$body2.password,
          username = _req$body2.username;

      try {
        var query = 'SELECT * FROM users WHERE username=$1';
        var values = [username];
        pool.query(query, values, function (error, result) {
          if (result.rowCount === 0 || error) {
            return res.json({
              message: 'Pls, enter a valid username'
            });
          }

          _bcryptjs.default.compare(password, result.rows[0].password).then(function (isMatch) {
            if (isMatch) {
              var admin = result.rows[0].is_admin;

              if (admin === true) {
                _jsonwebtoken.default.sign({
                  username: username,
                  password: password,
                  admin: admin
                }, process.env.secretKey, function (err, token) {
                  return res.json({
                    greeting: 'Welcome, Admin',
                    // Wrote the token to file so that it can be fetched from it
                    token: _fs.default.writeFile('token.txt', token, function (err) {
                      if (err) throw err;
                    })
                  });
                });
              }

              _jsonwebtoken.default.sign({
                username: username,
                password: password,
                admin: admin
              }, process.env.secretKey, function (err, token) {
                return res.json({
                  greeting: 'Welcome, User',
                  // Wrote the token to file so that it can be fetched from it
                  token: _fs.default.writeFile('token.txt', token, function (err) {
                    if (err) throw err;
                  })
                });
              });
            } else {
              res.status(400).json({
                err: 'password is not correct'
              });
            }
          });
        });
      } catch (err) {
        throw err;
      }
    }
  }]);

  return UserControllers;
}();

var _default = UserControllers;
exports.default = _default;