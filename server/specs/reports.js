import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.should();

chai.use(chaiHttp);

describe('GET /v1/reports', () => {
    it('it should get all reports', ((done) => {
      chai.request(app)
        .get('/api/v1/reports/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('Object');
          done(err);
        });
    }));
  });