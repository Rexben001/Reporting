import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.should();

chai.use(chaiHttp);

describe('post a report', () => {
  it('It should return the details of the newly created report', ((done) => {
    const report = {
      name: 'Security challenges',
      status: 'Rejected',
      latitude: '123.3434',
      longitude: '99.0987',
      description: 'Robbery has been the order of the day',
      placedBy: 1
    };

    chai.request(app)
      .post('/api/v1/reports')
      .send(report)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message[0].should.have.property('name').equal('Security challenges');
        res.body.message[0].latitude.should.equal('123.3434');
        done(err);
      });
  }));
});

describe('GET /v1/reports', () => {
  it('it should get all reports', ((done) => {
    chai.request(app)
      .get('/api/v1/reports')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.be.a('Array');
        res.body.message[0].name.should.equal('Security challenges');
        done(err);
      });
  }));
});

describe('Get a particular report', () => {
  it('It should return a particular report created by the user', ((done) => {
    chai.request(app)
      .get('/api/v1/reports/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.success.should.equal('True');
        res.body.message[0].status.should.equal('Rejected');
        res.body.message[0].latitude.should.equal('123.3434');
        done(err);
      });
  }));
});




describe('Edit the location of a  particular report', () => {
  it('It should return an updated report of an edited report', ((done) => {
    const location = {
      latitude: '34567',
      longitude: '9876'
    };
    chai.request(app)
      .patch('/api/v1/reports/1/edit')
      .send(location)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message[0].latitude.should.equal('34567');
        res.body.message[0].longitude.should.equal('9876');
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
      .patch('/api/v1/reports/1/status')
      .send(status)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message[0].status.should.equal('Reviewing');
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
        res.body.message[0].status.should.equal('Rejected');
        done(err);
      });
  }));
});
