//imports controllers
var cards = require('./controllers/cards');
var cubes = require('./controllers/cubes');

module.exports = function(app) {
  //Read 1 card
  app.get('/cards/:id', cards.getCard)
  //Populate card list
  app.get('/populateCards', cards.populateCards);
  //Wipe card list (for testing)
  app.get('/boardwipe', cards.wipeCards);


  //Create 1 cube - Submit from new cube form
  app.post('cube', cubes.createCube);

  //Read 1 cube - List of cards
  //Read all cubes - List of cubes, links to read 1 cube
  //Update one cube
  //Delete one cube

  //Create 1 user
  //Read 1 user - User profile view
  //Update 1 user
  //Delete 1 user
}