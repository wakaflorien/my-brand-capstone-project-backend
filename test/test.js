const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');


const should = chai.should();

chai.use(chaiHttp);
chai.should();

//Get all the blogs

describe('1) Get all the blogs', function () {
    // this.timeout(577);
    it("it should Get all the blogs", function(done) {
        this.timeout(500);
        setTimeout(done, 300);
        chai.request(app)
        .get("/posts")
        .end((err, res) =>{
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eq(4);
            done();
        })
    });
    it("Internal Server Error", function(done) {
        this.timeout(500);
        setTimeout(done, 300);
        chai.request(app)
        .get("/posts")
        .end((err, res) =>{
            res.should.have.status(500);
           
        });
    });
    it("Blog  not found", function(done) {
        this.timeout(500);
        setTimeout(done, 300);
        chai.request(app)
        .get("/posts")
        .end((err, res) =>{
            res.should.have.status(404);
           
        })
    });
});

describe(' Get blog by Id', function () {
    it("Bad request error", function(done) {
        this.timeout(500);
        setTimeout(done, 300);
        chai.request(app)
        .get("/posts")
        .end((err, res) =>{
            res.should.have.status(400);
           
        });
    });
    it("Blog not found", function(done) {
        this.timeout(500);
        setTimeout(done, 300);
        const blogId = "61dff76b8a9f8853e96b6069"
        chai.request(app)
        .get("/posts" + blogId + "12")
        .end((err, res) =>{
            res.should.have.status(404);
           
        })
    });
    it("OK", function(done) {
        this.timeout(500);
        setTimeout(done, 300);
        const blogId = "61f81df1d0c3807d9dd2474e"
        chai.request(app)
        .get("/posts" + blogId)
        .end((err, res) =>{
            res.should.have.status(200);
           
        })
    });
});

//postBlog

describe('/POST blog', function(){
    it('it should not POST a blog without title field', function(done){
        this.timeout(500);
        setTimeout(done, 300);
        let blog = {
            title: null,
            subTitle:"blah blah....",
            postBody:"blah blah....",
            imageUrl: "damas",
        }
          chai.request(app)
          .post('/posts')
          .send(blog)
          .end((err, res) => {
                res.should.have.status(400);
                // res.body.should.be.a('object');
                // res.body.should.have.property('error');
                // res.body.error.should.have.property('title');
                // res.body.error.title.should.have.property('title').eql('all fields are required');
            done();
          });
    });
    it('it should POST a blog ', function(done) {
        this.timeout(500);
        setTimeout(done, 300);
        let blog = {
            title: "education",
            subTitle:"blah blah....",
            postBody:"blah blah....",
            imageUrl: "damas",
            
        }
          chai.request(app)
          .post('/posts')
          .send(blog)
          .end((err, res) => {
                res.should.have.status(201);
                // res.body.should.be.a('object');
                // res.body.should.have.property('message').eql('post created');
                // res.body.blog.should.have.property('title');
                // res.body.blog.should.have.property('subTitle');
                // res.body.blog.should.have.property('postBody');
                // res.body.blog.should.have.property('imageUrl');
            done();
          });
    });
});