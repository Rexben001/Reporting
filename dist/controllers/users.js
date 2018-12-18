"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _userdb = _interopRequireDefault(require("../models/userdb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var pool = _userdb.default.pool;
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
      pool.connect(function (client, done) {
        var query = 'SELECT * FROM users';
        client.query(query, function (err, result) {
          done();

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
            res.json({
              message: 'Users Information retrieved',
              users: result.rows
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
          registered = _req$body.registered; // const user = {
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

      pool.connect(function (client, done) {
        var query = 'INSERT INTO users(firstname, lastname, othernames, username, email, phone, password, registered) VALUES($1,$2,$3,$4,$5,$6,$7,NOW()) RETURNING *';
        var value = [firstname, lastname, othernames, username, email, phonenumber, password, registered];
        client.query(query, value, function (err, result) {
          done();

          if (err) {
            res.status(422).json({
              error: 'Unable to retrieve user'
            });
          } else {
            res.json({
              message: result
            });
          }
        });
      });
    }
  }]);

  return UserControllers;
}();

var _default = UserControllers;
exports.default = _default;