"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai.default.should();

_chai.default.use(_chaiHttp.default);

describe('GET /v1/reports', function () {
  it('it should get all reports', function (done) {
    _chai.default.request(_app.default).get('/api/v1/reports').end(function (err, res) {
      res.should.have.status(200);
      res.body.message.should.be.a('Array');
      res.body.message[0].name.should.equal('Poor Security');
      done(err);
    });
  });
});
describe('Get a particular report', function () {
  it('It should return a particular report created by the user', function (done) {
    _chai.default.request(_app.default).get('/api/v1/reports/1').end(function (err, res) {
      res.should.have.status(200);
      res.body.success.should.equal('True');
      res.body.message[0].status.should.equal('Rejected');
      res.body.message[0].latitude.should.equal('123.3434');
      done(err);
    });
  });
});
describe('post a report', function () {
  it('It should return the details of the newly created report', function (done) {
    var report = {
      name: 'Security challenges',
      status: 'Rejected',
      latitude: '123.3434',
      longitude: '99.0987',
      description: 'Robbery has been the order of the day',
      placedBy: 1
    };

    _chai.default.request(_app.default).post('/api/v1/reports').send(report).end(function (err, res) {
      res.should.have.status(200);
      res.body.message[0].should.have.property('name').equal('Security challenges');
      res.body.message[0].latitude.should.equal('123.3434');
      done(err);
    });
  });
});
describe('Edit the location of a  particular report', function () {
  it('It should return an updated report of an edited report', function (done) {
    var location = {
      latitude: '34567',
      longitude: '9876'
    };

    _chai.default.request(_app.default).patch('/api/v1/reports/2/edit').send(location).end(function (err, res) {
      res.should.have.status(200);
      res.body.message[0].latitude.should.equal('34567');
      res.body.message[0].longitude.should.equal('9876');
      done(err);
    });
  });
});
describe('Edit the status of a particular report', function () {
  it('It should return an updated report of an edited report', function (done) {
    var status = {
      status: 'Reviewing'
    };

    _chai.default.request(_app.default).patch('/api/v1/reports/2/status').send(status).end(function (err, res) {
      res.should.have.status(200);
      res.body.message[0].status.should.equal('Reviewing');
      done(err);
    });
  });
});
describe('Delete a particular report', function () {
  it('It should return an updated report of a deleted report', function (done) {
    _chai.default.request(_app.default).patch('/api/v1/reports/1/cancel').end(function (err, res) {
      res.should.have.status(200);
      res.body.message[0].status.should.equal('Rejected');
      done(err);
    });
  });
});