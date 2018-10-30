process.env.NODE_ENV = 'MODE_TEST';
var db = require('../app/db');
var chai = require("chai");
var chaiHttp = require('chai-http')
var server = require('../app/server');
var should = chai.should(); 

chai.use(chaiHttp);

describe("Cards", function() {
  //populate five test cards
  before(async () => {
    for(i=0;i<6;i++) {
      //name, mana_cost, cmc, colors, rarity 
      const newCardProps = ['test_card_name'+i,'{W}{B}',2,'White,Black', 'Rare'];

      await db.query('INSERT INTO cards(name, mana_cost, cmc, colors, rarity) VALUES (?,?,?,?,?)', newCardProps)
    };
  });

  //delete all data from card table
  after(async () => {
    return db.query('DELETE FROM cards');
  });

  it('should list a SINGLE card on /cards/<id> GET', async () => {
    const newCardProps = ['test_card_name_get','{W}{B}',2,'White', 'Rare'];
    return db.query('INSERT INTO cards(name, mana_cost, cmc, colors, rarity) VALUES (?,?,?,?,?)', newCardProps)
      .then(async (result) => {
        let res = await chai.request(server).get('/cards/' + result.insertId)
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('name');
        res.body.should.have.property('mana_cost');
        res.body.should.have.property('cmc');
        res.body.should.have.property('colors');
        res.body.should.have.property('rarity');
      });
  });
});
