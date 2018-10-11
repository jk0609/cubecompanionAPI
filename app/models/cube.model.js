var db = require('../db.js')

class Cube {
  constructor(user, name, size, cards) {
    this.user = user;
    this.name = name;
    this.size = size;
    this.cards = cards;
  }
}

exports.createCube = function(user, name, size, cards) {
  //query to insert cube row into cube table
  let newCubeProps = [
    user,
    name,
    size,
    cards
  ]

  db.get().query('INSERT INTO cubes(user, name, size, cards) VALUES (?,?,?,?)', newCubeProps, function(err) {
    if (err) throw(err);
  })
}

exports.getCube = function(cube_id, callback) {
  db.get().query('SELECT * FROM cubes WHERE cube_id = ?', cube_id, function(err, result){
    if (err) throw err;
    var newCubeProps = result[0];
    // creates new Cube class instance based on query results
    let newCube = new Cube(
      newCubeProps['user'],
      newCubeProps['name'],
      newCubeProps['size'],
      //Need to make a call to join table to retrieve cards
      newCubeProps['cards']
    )

    // takes newCube and runs it through callback defined in controller
    callback(newCube);
  });
}

exports.getAllCubes = function(callback) {
  db.get().query('SELECT * FROM cubes', function(err, result){
  if (err) throw(err);
  callback(result);
  // returns an array of rows from cubes table
  });
}

exports.updateCube = function(data) {
  db.get().query('UPDATE cubes SET name = ?, size = ?, cards = ? WHERE cube_id = ?', data, function(err, result){
    if (err) throw(err);
  });
}

exports.deleteCube = function(cube_id) {
  db.get().query('DELETE FROM cubes WHERE cube_id = ?', cube_id, function(err, result) {
    if (err) throw(err);
  })
}

exports.addCards = function(cards, cube_id) {
  // explode cards string into array of card ids
  let cardArr = cards.split(",");
  cardArr.forEach( card => {
    console.log(card);
    // loop through ids, batch insert rows into cards2cubes
  });

  db.get().query('INSERT INTO cards2cubes(card_id, cube_id) VALUES (?, ?)', addCards, function(err, result) {
    if (err) throw(err);
  })
}