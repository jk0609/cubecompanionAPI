//imports controllers
var core = require('./controllers/core');
var api = require('./controllers/api');

module.exports = function(app) {
  //POST
  app.get('/create', core.create)
  //GET
  app.get('/read', core.read)
  //API Results
  app.get('/api/results', api.results)
}