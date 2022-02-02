const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

const should = chai.should();

chai.use(chaiHttp);
chai.should();

  describe('POST /', function() {
    it('It should login a user', function(done) {
        this.timeout(500);
        setTimeout(done, 300);
        chai.request(app)
        .post('/auth')
        .send({ email: 'test@gmail.com', password: 'test123' })
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
    it('Invalid user!', (done) => {
      chai.request(app)
      .post('/auth')
      .send({ email: 'test@gmail.com', password: 123456789 })
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
  });
    it('It should not login with Invalid email or password', (done) => {
        chai.request(app)
        .post('/auth')
        .send({ email: 'test@gmail.com', password: 123456789 })
        .end((err, response) => {
          response.should.have.status(401);
          done();
        });
    });
    it('It should not login with null password', (done) => {
        chai.request(app)
        .post('/auth')
        .send({ email: 'cyifuzos@gmail.com', password: null })
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
    it('It should not login with null email', (done) => {
        chai.request(app)
        .post('/auth')
        .send({ email: null, password: 'test1235' })
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
  });