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

exports.createCube = function(req, res){
  let newCubeProps = [
    //placeholder user
    1,
    req.body.name,
    req.body.size,
    req.body.cards
  ];

  db.get().query('INSERT INTO cubes(user, name, size, cards) VALUES (?,?,?,?)', newCubeProps, function(err) {
    if (err) res.send(err);
    else {
      res.send("Cube created!");
    }
  });
}

exports.getCube = function(req, res){
  db.get().query('SELECT * FROM cubes WHERE cube_id = ?', req.params.id, function(err, result){
    if (err) res.send(err);
    else {
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
    }
  });
}

exports.getAllCubes = function(req, res) {
  db.get().query('SELECT * FROM cubes', function(err, result){
    if (err) res.send(err);
    else {
      res.json(result);
    }
    // returns an array of rows from cubes table
  });
}

exports.updateCube = function(req, res) {
  let updateCubeProps = [
                req.body.name,
                req.body.size,
                req.body.cards,
                req.params.id
              ];
  db.get().query('UPDATE cubes SET name = ?, size = ?, cards = ? WHERE cube_id = ?', updateCubeProps, function(err, result){
    if (err) res.send(err);
    else {
      res.send("Cube id "+req.params.id+" updated!")
    }
  });
}

exports.deleteCube = function(req, res) {
  db.get().query('DELETE FROM cubes WHERE cube_id = ?', req.params.id, function(err, result) {
    if (err) res.send(err);
    else {
      res.send("Cube id "+req.params.id+" deleted!");
    }
  })
  
}

exports.getCards = function(req, res) {
  // Querys cards2cubes join table for all cards with cube_id = current cube id
  db.get().query('SELECT cards.card_id, cards.name, cards.mana_cost, cards.cmc, cards.colors, cards.rarity FROM cards INNER JOIN cards2cubes ON cards.card_id = cards2cubes.card_id WHERE cards2cubes.cube_id = ?', req.params.id, function(err, result) {
    if (err) res.send(err);
    else {
      res.json(result);
    }
  })
}
exports.addCards = function(req, res) {
  // Formatting imploded array into a 3D array for db query arg
  let cardsToAdd = req.body.cards.split(",").map(card_id => 
    [card_id, req.params.id]
  );

  // need error handling for duplicate entries
  db.get().query('INSERT INTO cards2cubes(card_id, cube_id) VALUES ?', [cardsToAdd], function(err, result) {
    if (err) res.send(err);
    else {
      res.send("Cards added!");
    }
  })
}