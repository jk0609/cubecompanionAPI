var express = require('express');
var path = require('path');
var db = require('./db');
require('dotenv').config();

var app = express();

//intialize view engine, aka template code
app.set('view engine', 'ejs');

//establish public folders
app.set('views', path.join(__dirname, '..', '/public/views'));
app.use(express.static(path.join(__dirname, '..', '/public/views')));

// Connect to MySQL on start
db.connect(db.MODE_PRODUCTION, function(err) {
  if (err) {
    console.log('Unable to connect to MySQL.')
    process.exit(1)
  } else {
    app.listen(3000, function() {
      console.log('MySQL is listening on port 3000...')
    })
  }
})

//initialize body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//routes
require('./routes.js')(app);

module.exports = app;