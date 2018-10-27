process.env.NODE_ENV = 'MODE_TEST';
var db = require('../app/db');
var chai = require('chai');
var chaiHttp = require('chai-http')
var server = require('../app/server');
var should = chai.should(); 

chai.use(chaiHttp);

// Used for GET tests with id
var testId, testCardId;

describe('Cubes', function() {
  before(async () => {
    // user, name, size
    const testCubeProps = [1,'test_cube_1',540];
    //name, mana_cost, cmc, colors, rarity 
    const newCardProps = ['test_card_name','{W}{B}',2,'White,Black', 'Rare'];

    //populate a test cube and card
    let cubeInsert = await db.query('INSERT INTO cubes(user, name, size) VALUES (?,?,?)', testCubeProps)
    testId = cubeInsert.insertId;

    let cardInsert = await db.query('INSERT INTO cards(name, mana_cost, cmc, colors, rarity) VALUES (?,?,?,?,?)', newCardProps)
    testCardId = cardInsert.insertId;
  });

  // delete all data from tables
  after(async () => {
    return db.query('DELETE FROM cubes')
    .then(db.query('DELETE FROM cards'))
    .then(db.query('DELETE FROM cards2cubes'))
  });

  it('should list a SINGLE cube on /cubes/<id> GET', async() => {
    let res = await chai.request(server).get('/cubes/' + testId);
    res.should.have.status(200);
    res.should.be.json;
    res.body.should.have.property('user');
    res.body.should.have.property('name');
    res.body.should.have.property('size');
    res.body.should.have.property('cards');
  });

  it('should list ALL cubes on /cubes GET', async() => {
    // Instead of calling 'done', just return the Promise directly or await the response
    let res = await chai.request(server).get('/cubes');
    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('array');
    res.body[0].should.have.property('cube_id');
  });

  it('should add a SINGLE cube on /cubes POST', async() => {
    const newCubeProps = {
      //user placeholder
      name: 'test_cube',
      size: 360
    };

    let res = await chai.request(server).post(`/cubes/new`).send(newCubeProps);
    res.statusCode.should.equal(200);
    res.text.should.equal('Cube created!');
  });

  it('should update a SINGLE cube on /cube/<id> PUT', async() => {
    let res = await chai.request(server).put('/cubes/'+testId).send({'name': 'test_cube_update'});
    res.statusCode.should.equal(200);
    res.text.should.equal('Cube id '+testId+' updated!');
  });

  it('should delete a SINGLE cube on /cubes/<id> DELETE', async() => {
    let res = await chai.request(server).delete('/cubes/' + testId);
    res.text.should.equal('Cube id '+testId+' deleted!');
  });

  it('should associate cards with a SINGLE cube on /cubes/<id>/cards POST', async() => {
    let res = await chai.request(server).post('/cubes/'+testId+'/cards').set('content-type', 'application/x-www-form-urlencoded').send({'cards': testCardId});
    res.text.should.equal('Cards added!');
  });
  
  it('should list all cards associated with a SINGLE cube on /cubes/<id>/cards GET', async() => {
    let res = await chai.request(server).get('/cubes/'+testId+'/cards');
    res.should.be.json;
    res.body[0].should.have.property('name');
    res.body[0].should.have.property('mana_cost');
    res.body[0].should.have.property('cmc');
    res.body[0].should.have.property('colors');
    res.body[0].should.have.property('rarity');
  });
});

