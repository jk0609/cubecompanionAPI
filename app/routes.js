//imports controllers
var core = require('./controllers/core');
var api = require('./controllers/api');

module.exports = function(app) {
  //Home
  app.get('/', core.home)
  //API Results
  app.get('/api/results', api.results)
}