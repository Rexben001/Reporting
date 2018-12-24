import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.should();

chai.use(chaiHttp);

describe('Add new user', () => {
  it('it should post new user', ((done) => {
    const users = {
      firstname: 'SBen',
      lastname: 'SRex',
      othernames: 'DSeyi',
      email: 'srex@gmail.com',
      phonenumber: '234567890',
      username: 'Dexben',
      password: '3456789uijh'
    };
    chai.request(app)
      .post('/api/v1/users')
      .send(users)
      .end((err, res) => {
        res.should.have.status(200);
        done(err);
      });
  }));
});

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


// describe('Log in', () => {
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
