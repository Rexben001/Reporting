"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodeInputValidator = _interopRequireDefault(require("node-input-validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @class Validator
 */
var Validator =
/*#__PURE__*/
function () {
  function Validator() {
    _classCallCheck(this, Validator);
  }

  _createClass(Validator, null, [{
    key: "checkUser",

    /**
     * @param {Object} req - Request
     * @param {Object} res - Response
     * @returns {json} reports
     * @param {Function} next - next middleware
     */
    value: function checkUser(req, res, next) {
      var validator = new _nodeInputValidator.default(req.body, {
        firstname: 'required|minLength:3',
        lastname: 'required|minLength:3',
        othernames: 'required|minLength:3',
        email: 'required|email',
        username: 'required|minLength:3',
        password: 'required',
        phonenumber: 'required'
      });
      validator.check().then(function (matched) {
        if (!matched) {
          return res.status(422).json(validator.errors);
        }

        next();
      });
    }
  }, {
    key: "checkReports",
    value: function checkReports(req, res, next) {
      var validator = new _nodeInputValidator.default(req.body, {
        name: 'required|string',
        latitude: 'required',
        longitude: 'required',
        description: 'required'
      });
      validator.check().then(function (matched) {
        if (!matched) {
          return res.status(422).json(validator.errors);
        }

        next();
      });
    }
  }, {
    key: "checkEdit",
    value: function checkEdit(req, res, next) {
      var validator = new _nodeInputValidator.default(req.body, {
        latitude: 'required',
        longitude: 'required'
      });
      validator.check().then(function (matched) {
        if (!matched) {
          return res.status(422).json(validator.errors);
        }

        next();
      });
    }
  }, {
    key: "checkStatus",
    value: function checkStatus(req, res, next) {
      var validator = new _nodeInputValidator.default(req.body, {
        status: 'required|string'
      });
      validator.check().then(function (matched) {
        if (!matched) {
          return res.status(422).json(validator.errors);
        }

        next();
      });
    }
  }]);

  return Validator;
}();

var _default = Validator;
exports.default = _default;