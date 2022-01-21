var should = require('should');
var assert = require('assert');
var request = require('supertest');
// var app = require('../index');
const server = 'http://localhost:3500/'

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe('Posts', () => {
    describe('POST posts', () => {
        it('should create a new post object', (done) => {
            const post = {
                'title': 'testing',
                'postBody': 'testing body',
                'is_dobe': true
            }
            request(server)
                .post('/posts')
                .send(post)
                .expect(201, done)
        })
    })
})