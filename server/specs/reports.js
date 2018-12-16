import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { stat } from 'fs';

chai.should();

chai.use(chaiHttp);

describe('GET /v1/reports', () => {
  it('it should get all reports', ((done) => {
    chai.request(app)
      .get('/api/v1/reports')
      .end((err, res) => {
        res.should.have.status(200);
        // res.body.success.should.equal(true);
        res.body.message.should.be.a('Array');
        res.body.message[0].name.should.equal('Bad roads');
        done(err);
      });
  }));
});

describe('Get a particular report', () => {
  it('It should return a particular report created by the user', ((done) => {
    chai.request(app)
      .get('/api/v1/reports/2')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.name.should.equal('Corrupt Govrnment Officials');
        res.body.message.latitude.should.equal(20.098);
        done(err);
      });
  }));
});


describe('post a report', () => {
  it('It should return the details of the newly created report', ((done) => {
    const report = {
      id: 3,
      name: 'Security challenges',
      status: 'Rejected',
      latitude: 123.3434,
      longitude: 99.0987,
      description: 'Robbery has been the order of the day',
    };

    chai.request(app)
      .post('/api/v1/reports')
      .send(report)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.have.property('name').equal('Security challenges');
        res.body.message.latitude.should.equal(123.3434);
        done(err);
      });
  }));
});


describe('Edit the location of a  particular report', () => {
  it('It should return an updated report of an edited report', ((done) => {
    const location = {
      latitude: 34567,
      longitude: 9876
    };
    chai.request(app)
      .patch('/api/v1/reports/2/edit')
      .send(location)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.latitude.should.equal(34567);
        res.body.message.longitude.should.equal(9876);
        done(err);
      });
  }));
});

describe('Edit the status of a particular report', () => {
  it('It should return an updated report of an edited report', ((done) => {
    const status = {
      status: 'Reviewing',
    };
    chai.request(app)
      .patch('/api/v1/reports/2/status')
      .send(status)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.status.should.equal('Reviewing');
        done(err);
      });
  }));
});


describe('Delete a particular report', () => {
  it('It should return an updated report of a deleted report', ((done) => {
    chai.request(app)
      .patch('/api/v1/reports/1/cancel')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.status.should.equal('Rejected');
        done(err);
      });
  }));
});
