"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _fs = _interopRequireDefault(require("fs"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv.default.config(); // console.log(process.env.secretKey);


var Auth =
/*#__PURE__*/
function () {
  function Auth() {
    _classCallCheck(this, Auth);
  }

  _createClass(Auth, null, [{
    key: "verifyUser",
    value: function verifyUser(req, res, next) {
      // Read from token.txt or added manually
      var token = _fs.default.readFileSync('token.txt', 'utf8') || req.headers['x-access-token']; // console.log(token);

      if (!token || token === undefined) {
        return res.json({
          success: false,
          message: 'No token provided.'
        });
      }

      _jsonwebtoken.default.verify(token, process.env.secretKey, function (err, decode) {
        if (err) {
          return res.json({
            success: false,
            message: 'Failed to authenticate token.'
          });
        }

        req.decoded = decode;
        next();
      });
    }
  }]);

  return Auth;
}();

var _default = Auth;
exports.default = _default;