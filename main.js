//imports env variables. Doesn't do anything here, just practice.
require('dotenv').config();

var app = require('./app/server');

app.listen(8080, function(){
  console.log('server is running');
});

