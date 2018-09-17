//imports controllers
var core = require('./controllers/core');

module.exports = function(app) {
  //POST
  app.post('/create', core.create);
  //GET
  app.get('/read', core.read);
  //DELETE
  app.get('/:id/delete', core.delete);


  //Populate card list
  app.get('/populateCards', core.populateCards);
  //Wipe card list (for testing)
  app.get('/boardwipe', core.wipeCards);
}