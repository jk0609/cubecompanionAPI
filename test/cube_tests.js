process.env.NODE_ENV = 'MODE_TEST';
var db = require('../app/db');
var chai = require("chai");
var chaiHttp = require('chai-http')
var server = require('../app/server');
var should = chai.should(); 

chai.use(chaiHttp);

var testCubeProps = [
  1,
  "test_cube_1",
  540,
  "1,2,3"
];

// Used for GET tests with id
var testId = 0;

describe("Cubes", function() {
  before(function(done) {
    //populate a test cube
    db.query('INSERT INTO cubes(user, name, size, cards) VALUES (?,?,?,?)', testCubeProps)
      .then(function(err, result) {
        if (err) throw err
        testId = result.insertId;
        done();
      });
  });

  // delete all data from tables
  after(function(done) {
    db.query('DELETE FROM cubes')
    .then(db.query('DELETE FROM cards'))
    .then(db.query('DELETE FROM cards2cubes'));
  });

  it('should list ALL cubes on /cubes GET', function(done) {
    chai.request(server)
      .get('/cubes')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('cube_id');
        done();
      });
  });
  
  it('should list a SINGLE cube on /cubes/<id> GET', function(done) {
    chai.request(server)
    .get('/cubes/' + testId)
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.have.property('user');
      res.body.should.have.property('name');
      res.body.should.have.property('size');
      res.body.should.have.property('cards');
      done();
    });
  });

  it('should add a SINGLE cube on /cubes POST', function(done) {
    const newCubeProps = {
      name: "test_cube",
      size: 360
    };

    chai.request(server)
      .post(`/cubes/new`)
      .send(newCubeProps)
      .end(function(err, res) {
        res.text.should.equal('Cube created!');
        done();
      });
  });

  it('should update a SINGLE cube on /cube/<id> PUT', function(done) {
    chai.request(server)
      .put('/cubes/' + testId)
      .send({'name': 'test_cube_update'})
      .end(function(err, res){
        res.text.should.equal('Cube id ' + testId + ' updated!')
        done();
    });
  });

  it('should delete a SINGLE cube on /cubes/<id> DELETE', function(done) {
    chai.request(server)
      .delete('/cubes/' + testId)
      .end(function(err, res){
        res.text.should.equal('Cube id ' + testId + ' deleted!');
        done();
      });
  });

  it('should associate cards with a SINGLE cube on /cubes/<id>/cards POST', function(done) {
    //populate 3 test cards
    var testCardIds = [];
    for(i=0;i<4;i++) {
      var newCardProps = [
        'test_card_name_'+i,
        '{W}{B}',
        2,
        'White,Black', 
        'Rare',
      ]

      db.query('INSERT INTO cards(name, mana_cost, cmc, colors, rarity) VALUES (?,?,?,?,?)', newCardProps)
        .then(function(err, result) {
          if (err) throw err;
          testCardIds.push(result.insertId);
        });
    };
    //async issue with added cards to DB.
    chai.request(server)
      .post('/cubes/'+testId+'/cards')
      .send({'cards': testCardIds.join(',')})
      .end(function(err, res) {
        res.text.should.equal('Cards added!');
        done();
      });  
  });
  
  it('should list all cards associated with a SINGLE cube on /cubes/<id>/cards GET', function(done) {
    chai.request(server)
      .get('/cubes/'+testId+'/cards')
      .end(function(err, res) {
        res.should.be.json;
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('mana_cost');
        res.body[0].should.have.property('cmc');
        res.body[0].should.have.property('colors');
        res.body[0].should.have.property('rarity');
        done();
      });  
  });
})

