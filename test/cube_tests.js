process.env.NODE_ENV = 'MODE_TEST';

var chai = require("chai");
var chaiHttp = require('chai-http')
var server = require('../app/server');
var should = chai.should(); 
var db = require('../app/db');

chai.use(chaiHttp);

describe("Cubes", function() {
  it('should list ALL cubes on /cubes GET', function(done) {
    chai.request(server)
      .get('/cubes')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        done();
      })
  });
  
  it('should list a SINGLE cube on /cube/<id> GET');
  it('should add a SINGLE cube on /cubes POST');
  it('should update a SINGLE cube on /cube/<id> PUT');
  it('should delete a SINGLE cube on /cube/<id> DELETE');
})

