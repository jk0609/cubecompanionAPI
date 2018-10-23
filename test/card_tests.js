process.env.NODE_ENV = 'MODE_TEST';
var db = require('../app/db');
var chai = require("chai");
var chaiHttp = require('chai-http')
var server = require('../app/server');
var should = chai.should(); 

chai.use(chaiHttp);

describe("Cards", function() {
  //populate five test cards
  before(function(done) {
    for(i=0;i<6;i++) {
      var newCardProps = [
        'test_card_name_'+i,
        '{W}{B}',
        2,
        'White,Black', 
        'Rare',
      ]

      db.query('INSERT INTO cards(name, mana_cost, cmc, colors, rarity) VALUES (?,?,?,?,?)', newCardProps, function(err, result) {
        if (err) throw err;
      });
    }
    done();
  });

  //delete all data from card table
  after(function(done) {
    db.query('DELETE FROM cards', function(err) {
      if (err) throw err
      done();
    });
  });

  it('should list a SINGLE card on /cards/<id> GET', function(done) {
    var newCardProps = [
      'test_card_name',
      '{W}{B}',
      2,
      'White,Black', 
      'Rare',
    ]

    db.query('INSERT INTO cards(name, mana_cost, cmc, colors, rarity) VALUES (?,?,?,?,?)', newCardProps, function(err, result) {
      if (err) throw err
      chai.request(server)
      .get('/cards/' + result.insertId)
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('name');
        res.body.should.have.property('mana_cost');
        res.body.should.have.property('cmc');
        res.body.should.have.property('colors');
        res.body.should.have.property('rarity');
        done();
      });
    });
  });
});
