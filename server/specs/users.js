import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.should();

chai.use(chaiHttp);

describe('GET /v1/users', () => {
    it('it should get all users', ((done) => {
      chai.request(app)
        .get('/api/v1/users/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('Object');
          done(err);
        });
    }));
  });