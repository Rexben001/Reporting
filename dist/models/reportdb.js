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

// const { Pool } = pg;
_dotenv.default.config();

var pool = new _pg.default.Pool({
  user: 'rex',
  host: 'localhost',
  database: 'report_db',
  password: process.env.password,
  port: 5432
});
pool.on('connect', function () {// console.log('connected to the Database');
});

var report =
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
            reportTable = "CREATE TABLE IF NOT EXISTS reports(\n    id SERIAL PRIMARY KEY,\n    status VARCHAR(128) NOT NULL,\n    name VARCHAR(128) NOT NULL,\n    longitude VARCHAR(128) NOT NULL,\n    latitude VARCHAR(128) NOT NULL,\n    description VARCHAR(128) NOT NULL,\n    placedBy INTEGER REFERENCES users(user_id)\n\n  );";
            _context.next = 3;
            return pool.query(reportTable);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function report() {
    return _ref.apply(this, arguments);
  };
}(); // pool.on('remove', () => {
//   console.log('client removed');
//   process.exit(0);
// });


var _default = {
  pool: pool,
  report: report
}; // const config = {
//   connectionString: 'postgres://localhost:5432/report'
// };
// const pool = new pg.Client(config);
// // pool.on('connect', () => {
// // });
// pool.connect();
// const query = pool.query(
//   // async () => {
//   // const report =
//   `CREATE TABLE IF NOT EXISTS
//   reports(
//     id SERIAL PRIMARY KEY,
//     status VARCHAR(128) NOT NULL,
//     name VARCHAR(128) NOT NULL,
//     longitude VARCHAR(128) NOT NULL,
//     latitude VARCHAR(128) NOT NULL,
//     description VARCHAR(128) NOT NULL
//   )`
// );
// query.on('end', () => { pool.end(); });
// // const result = await pool.query(report).catch(err =>{console.log(err)});
// // console.log(result);
// // };
// export default { query, pool };
// const report = [
//   {
//     id: 1,
//     name: 'Bad roads',
//     status: 'Drafted',
//     latitude: 123.3434,
//     longitude: 99.0987,
//     description: 'The bad road has moved from bad to worse',
//   },
//   {
//     id: 2,
//     name: 'Corrupt Govrnment Officials',
//     status: 'Resolved',
//     latitude: 20.098,
//     longitude: 44.567,
//     description: 'LASTMA officials are busy collecting bribes rather than doing their jobs',
//   }
// ];
// export default report;

exports.default = _default;