"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai.default.should();

_chai.default.use(_chaiHttp.default);

describe('Add new user', function () {
  it('it should post new user', function (done) {
    var users = {
      firstname: 'SBen',
      lastname: 'SRex',
      othernames: 'DSeyi',
      email: 'srex@gmail.com',
      phonenumber: '234567890',
      username: 'Dexben',
      password: '3456789uijh'
    };

    _chai.default.request(_app.default).post('/api/v1/users').send(users).end(function (err, res) {
      res.should.have.status(200);
      done(err);
    });
  });
});
describe('GET /v1/users', function () {
  it('it should get all users', function (done) {
    _chai.default.request(_app.default).get('/api/v1/users/').end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.a('Object');
      done(err);
    });
  });
}); // describe('Log in', () => {
//   it('it should log in user', ((done) => {
//     const users = {
//       username: 'Dexben',
//       password: '3456789uijh'
//     };
//     chai.request(app)
//       .post('/api/v1/users')
//       .send(users)
//       .end((err, res) => {
//         res.should.have.status(200);
//         done(err);
//       });
//   }));
// });