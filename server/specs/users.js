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

describe('Add new user', () => {
  it('it should get the details of the new users', ((done) => {
    const user = {
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
    }
    chai.request(app)
      .post('/api/v1/users/')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('Object');
        done(err);
      });
  }));
});
