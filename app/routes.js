//imports controllers
var cards = require('./controllers/cards');
var cubes = require('./controllers/cubes');

module.exports = function(app) {
  //Read 1 card
  app.get('/cards/:id', cards.getCard)
  //Populate card list
  app.get('/cards/populate', cards.populate);
  //Get cubes associated with card
  //

  //Create 1 cube - Submit from new cube form
  app.post('/cubes/new', cubes.createCube);
  //Read 1 cube - List of cards
  app.get('/cubes/:id', cubes.getCube);
  //Read all cubes - List of cubes, links to read 1 cube
  app.get('/cubes', cubes.getAllCubes);
  //Update one cube
  app.put('/cubes/:id', cubes.updateCube);
  //Delete one cube
  app.delete('/cubes/:id', cubes.deleteCube);
  //Add cards to cube
  app.post('/cubes/:id/cards', cubes.addCards);
  //Get cards associated with cube
  //

  //Create 1 user
  //Read 1 user - User profile view
  //Update 1 user
  //Delete 1 user
}