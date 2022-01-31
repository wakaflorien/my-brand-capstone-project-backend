const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const mongoose = require('mongoose')

const { expect } = chai

chai.use(chaiHttp);

describe('Posts', function() {
    describe('GET /posts', function () {
        it('should return an array of all posts', function (done) {
            chai.request(app)
                .get('/posts')
                .end((err, res) => {
                    if(err) done(err)
                    expect(res).to.have.status(200)
                    expect(res).to.be.an('object')
                    expect(res.body.posts).to.be.an('array')
                    done()
                })
                done()
        })
    })
})
// testing post
describe('Posts', function() {
    describe('POST /posts', function () {
        it('Created new blog post', (done) => {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJlbWFpbCI6Indha2EuZmxvcmllbjQ1QGdtYWlsLmNvbSIsInJvbGVzIjpbMTk5OCw1MTUwXX0sImlhdCI6MTY0MzAxMTQwMywiZXhwIjoxNjQzMDE1MDAzfQ.FrxMvlYH3aEPBSBnx9NdzrotUwVN2Rt-2N5nZPV_tQo"
            chai.request(app).post('/posts')
              .set({ 'token': token, Accept: 'application/json' })
              .send({
                title: "The best technologies to learn in 2022",
                postBody: "nodejs, reactjs, and mocha"
              })
              .then((res) => {
                const body = res.body;
                // expect(body).to.contain.property('data');
                // expect(res).to.have.status(201)
                expect(body).to.contain.property('status');
                done();
              })
              .catch((err) => done(err))
          })
    })
})
// testing put
describe('Posts', function() {
    describe('PUT /posts', function () {
        it('should return an 200 OK for UPDATE success', function (done) {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJlbWFpbCI6Indha2EuZmxvcmllbjQ1QGdtYWlsLmNvbSIsInJvbGVzIjpbMTk5OCw1MTUwXX0sImlhdCI6MTY0MzAxMTQwMywiZXhwIjoxNjQzMDE1MDAzfQ.FrxMvlYH3aEPBSBnx9NdzrotUwVN2Rt-2N5nZPV_tQo"
            chai.request(app).put('/posts')
              .set({ 'token': token, Accept: 'application/json' })
              .send({
                title: "The best technologies to learn in 2022",
                postBody: "nodejs, reactjs, and mocha"
              })
              .then((res) => {
                const body = res.body;
                // expect(body).to.contain.property('data');
                // expect(res).to.have.status(200)
                expect(body).to.contain.property('status');
                done();
              })
              .catch((err) => done(err))
        })
    })
})
// testing delete
describe('Posts', function() {
    describe('DELETE /posts', function () {
        it('should return an 200 OK for delete success', function (done) {
            chai.request(app)
                .delete('/posts')
                .end((err, res) => {
                    if(err) done(err)
                    expect(res).to.have.status(200)
                    expect(res).to.be.an('object')
                    done()
                })
        })
    })
})
// testing getting single post
describe('Posts', function() {
    describe('GET /posts/{id}', function () {
        it('should return an 200 OK for delete success', function (done) {
            chai.request(app)
                .get('/posts/{id}')
                .end((err, res) => {
                    if(err) done(err)
                    expect(res).to.have.status(200)
                    expect(res).to.be.an('object')
                    expect(res.body.post).to.be.an('array')
                    done()
                })
                done()
        })
    })
})

// Tests for comments
describe('Comments', function() {
    describe('GET /comments', function () {
        it('should return an array of all comments', function (done) {
            chai.request(app)
                .get('/comments')
                .end((err, res) => {
                    if(err) done(err)
                    expect(res).to.have.status(200)
                    expect(res).to.be.an('object')
                    expect(res.body.posts).to.be.an('array')
                    done()
                })
                done()
        })
    })
})
// testing post
describe('Comments', function() {
    describe('POST /comments', function () {
        it('should return an array of newly created comment', function (done) {
            chai.request(app)
                .post('/comments')
                .end((err, res) => {
                    if(err) done(err)
                    expect(res).to.have.status(201)
                    expect(res).to.be.an('object')
                    expect(res.body.result).to.be.an('array')
                    done()
                })
                done()
        })
    })
})
// testing delete
describe('Comments', function() {
    describe('DELETE /comments/{id}', function () {
        it('should return an 200 OK for delete success', function (done) {
            chai.request(app)
                .delete('/comments/{id}')
                .end((err, res) => {
                    if(err) done(err)
                    expect(res).to.have.status(200)
                    expect(res).to.be.an('object')
                    done()
                })
                done()
        })
    })
})