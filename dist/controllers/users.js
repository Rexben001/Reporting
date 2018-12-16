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
     * @returns {json} users
     */
    value: function getUsers(req, res) {
      return res.json({
        users: _userdb.default
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
          id = _req$body.id,
          firstname = _req$body.firstname,
          lastname = _req$body.lastname,
          othernames = _req$body.othernames,
          email = _req$body.email,
          phonenumber = _req$body.phonenumber,
          username = _req$body.username,
          registered = _req$body.registered,
          isAdmin = _req$body.isAdmin;
      var user = {
        id: id,
        firstname: firstname,
        lastname: lastname,
        othernames: othernames,
        email: email,
        phonenumber: phonenumber,
        username: username,
        registered: registered,
        isAdmin: isAdmin
      };

      _userdb.default.push(user);

      return res.json({
        user: user,
        users: _userdb.default
      });
    }
  }]);

  return UserControllers;
}();

var _default = UserControllers;
exports.default = _default;