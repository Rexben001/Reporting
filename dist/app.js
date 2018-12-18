"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _route = _interopRequireDefault(require("./route/route"));

var _userdb = _interopRequireDefault(require("./models/userdb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createUser = _userdb.default.createUser;
var app = (0, _express.default)(); // const router = express.Router();

app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json()); // router.get('/users', userss.getUsers());

app.get('/', function (req, res) {
  return res.status(200).json({
    success: true,
    message: 'Reporting Inc'
  });
});

var migrate =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return createUser();

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function migrate() {
    return _ref.apply(this, arguments);
  };
}();

migrate();
app.use('/api/v1', _route.default);
app.listen(process.env.PORT || 3000);
var _default = app;
exports.default = _default;