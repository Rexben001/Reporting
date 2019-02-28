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
}); // DROP TABLE IF EXISTS users CASCADE;

var users =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var userTable;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userTable = "\n  CREATE TABLE IF NOT EXISTS \n  users(\n    user_id SERIAL PRIMARY KEY,\n    firstname VARCHAR(128) NOT NULL,\n    lastname VARCHAR(128) NOT NULL,\n    othernames VARCHAR(128) NOT NULL,\n    email VARCHAR(128) NOT NULL,\n    password VARCHAR(128) NOT NULL,\n    username VARCHAR(128) NOT NULL,\n    phone VARCHAR(128) NOT NULL,\n    registered DATE,\n    is_admin BOOLEAN,\n    UNIQUE(username, email)\n  );";
            _context.next = 3;
            return pool.query(userTable).then(function (res) {
              console.log('User table created');
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

  return function users() {
    return _ref.apply(this, arguments);
  };
}();

var _default = {
  pool: pool,
  users: users
}; // pool.on('remove', () => {
//   console.log('client removed');
//   process.exit(0);
// });
// const users = [
//   {
//     id: 1,
//     firstname: 'Ben',
//     lastname: 'Rex',
//     othernames: 'Seyi',
//     email: 'rex@gmail.com',
//     phonenumber: '234567890',
//     username: 'Rexben',
//     registered: '12-12-12',
//     is_admin: false,
//     report: []
//   }
// ];
// export default users;

exports.default = _default;