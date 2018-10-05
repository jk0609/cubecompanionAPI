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
    if (err) console.log(err);
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
      newCubeProps['cards']
    )

    // takes newCube and runs it through callback defined in controller
    callback(newCube);
  });
}

exports.getAllCubes = function(callback) {
  //do some stuff
}