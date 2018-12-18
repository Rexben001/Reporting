"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('express-validator/check'),
    check = _require.check,
    validateResult = _require.validateResult;
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
      check('firstname').isString().isLength({
        min: 3
      });
      var errors = validateResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array()
        });
      }

      next();
    }
  }]);

  return Validator;
}();

var _default = Validator;
exports.default = _default;