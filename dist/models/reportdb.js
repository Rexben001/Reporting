"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pg = _interopRequireDefault(require("pg"));

require("make-runnable");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv.default.config();

var pool = new _pg.default.Pool({
  connectionString: process.env.DATABASE_URL
}); // {
//   user: 'rex',
//   host: 'localhost',
//   database: 'report_db',
//   password: process.env.password,
//   port: 5432
// }

pool.on('connect', function () {// console.log('connected to the Database');
});

var reports =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var reportTable;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            reportTable = "\n  CREATE TABLE IF NOT EXISTS \n  reports(\n    id SERIAL PRIMARY KEY,\n    name VARCHAR(128) NOT NULL,\n    status VARCHAR(128) NOT NULL,\n    latitude VARCHAR(128) NOT NULL,\n    longitude VARCHAR(128) NOT NULL,\n    description VARCHAR(128) NOT NULL,\n    time DATE NOT NULL DEFAULT CURRENT_DATE,\n    placedby INTEGER REFERENCES users(user_id)\n  );";
            _context.next = 3;
            return pool.query(reportTable).then(function (res) {
              console.log('Report table created');
            }).catch(function (err) {
              console.log(err);
              pool.end();
            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function reports() {
    return _ref.apply(this, arguments);
  };
}(); // pool.on('remove', () => {
//   console.log('client removed');
//   process.exit(0);
// });


var _default = {
  pool: pool,
  reports: reports
};
exports.default = _default;