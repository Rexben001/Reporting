"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _path = _interopRequireDefault(require("path"));

var _route = _interopRequireDefault(require("./route/route"));

var _userdb = _interopRequireDefault(require("./models/userdb"));

var _reportdb = _interopRequireDefault(require("./models/reportdb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var users = _userdb.default.users;
var report = _reportdb.default.report;
var app = (0, _express.default)(); // const router = express.Router();

app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json());
app.use(_express.default.static(_path.default.join(__dirname, '/../ui'))); // router.get('/users', userss.getUsers());

app.get('/', function (req, res) {
  // console.log(__dirname);
  res.sendFile(_path.default.join(__dirname, 'index.html'));
}); // res.status(200).json({
// success: true,
// message: 'Reporting Inc',
// const migrate = async () => {
//   await createUser();
//   await createReport();
// };
// migrate();

var createTable =
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
            return users();

          case 2:
            _context.next = 4;
            return report();

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function createTable() {
    return _ref.apply(this, arguments);
  };
}();

createTable();
app.use('/api/v1', _route.default);
app.listen(process.env.PORT || 3000, function () {
  console.log('Started');
});
var _default = app;
exports.default = _default;