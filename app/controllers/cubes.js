//Cube API functions
var db = require('../db.js');

class Cube {
  constructor(user, name, size, cards) {
    this.user = user;
    this.name = name;
    this.size = size;
    this.cards = cards;
  }
}

exports.getCube = function(req, res){
  db.query('SELECT * FROM cubes WHERE cube_id = ?', req.params.id)
    .then((result) => {
      var newCubeProps = result[0];
      // creates new Cube class instance based on query results
      let newCube = new Cube(
        //needs id?
        newCubeProps['user'],
        newCubeProps['name'],
        newCubeProps['size'],
        //Need to make a call to join table to retrieve cards
        newCubeProps['cards']
      )
      res.json(newCube);
    })
    .catch(err => {
      res.send(err);
    });
}

exports.getAllCubes = function(req, res) {
  db.query('SELECT * FROM cubes')
    .then((result) => {
      res.json(result);
    })
    .catch( err => {
      res.send(err);
    });
}

exports.createCube = function(req, res){
  let newCubeProps = [
    //placeholder user
    1,
    req.body.name,
    req.body.size,
    req.body.cards
  ];

  db.query('INSERT INTO cubes(user, name, size, cards) VALUES (?,?,?,?)', newCubeProps)
    .then(() => {
      res.send('Cube created!');
    })
    .catch(err => {
      res.send(err);
    });
}

exports.updateCube = function(req, res) {
  let updateCubeProps = [
                req.body.name,
                req.body.size,
                req.params.id
              ];

  db.query('UPDATE cubes SET name = ?, size = ? WHERE cube_id = ?', updateCubeProps)
    .then(() => {
      res.send('Cube id '+req.params.id+' updated!')
    })
    .catch(err => {
      res.send(err);
    });
}

exports.deleteCube = function(req, res) {
  db.query('DELETE FROM cubes WHERE cube_id = ?', req.params.id)
    .then(() => {
      res.send('Cube id '+req.params.id+' deleted!');
    })
    .catch(err => {
      res.send(err);
    });
}

exports.getCards = function(req, res) {
  // Querys cards2cubes join table for all cards with cube_id = current cube id
  db.query('SELECT cards.card_id, cards.name, cards.mana_cost, cards.cmc, cards.colors, cards.rarity FROM cards INNER JOIN cards2cubes ON cards.card_id = cards2cubes.card_id WHERE cards2cubes.cube_id = ?', req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch(err => {
      res.send(err);
    });
}
exports.addCards = function(req, res) {
  // Formatting imploded array into a 3D array for db query arg
  let cardsToAdd = req.body.cards.split(',').map(card_id => 
    [card_id, req.params.id]
  );

  // need error handling for duplicate entries
  db.query('INSERT INTO cards2cubes(card_id, cube_id) VALUES ?', [cardsToAdd])
    .then((result) => {
      res.send('Cards added!');
    })
    .catch(err => {
      res.send(err);
    });
}