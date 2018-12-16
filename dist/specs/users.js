"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai.default.should();

_chai.default.use(_chaiHttp.default);

describe('GET /v1/users', function () {
  it('it should get all users', function (done) {
    _chai.default.request(_app.default).get('/api/v1/users/').end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.a('Object');
      done(err);
    });
  });
});
describe('Add new user', function () {
  it('it should get the details of the new users', function (done) {
    var user = {
      id: 1,
      firstname: 'Ben',
      lastname: 'Rex',
      othernames: 'Seyi',
      email: 'rex@gmail.com',
      phonenumber: '234567890',
      username: 'Rexben',
      registered: '12-12-12',
      is_admin: false,
      report: []
    };

    _chai.default.request(_app.default).post('/api/v1/users/').send(user).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.a('Object');
      done(err);
    });
  });
});