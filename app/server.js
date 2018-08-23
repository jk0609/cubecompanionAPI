var express = require('express');
var path = require('path');

var app = express();

//intialize view engine, aka template code
app.set('view engine', 'ejs');

//establish public folders
app.set('views', path.join(__dirname, '..', '/public/views'));
app.use(express.static(path.join(__dirname, '..', '/public/views')));

//routes
require('./routes.js')(app);

//initialize mongoose and use global Promise library
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//define path to local db, connect to db on that path
let dev_db_url = 'mongodb://localhost:27017/cubecompanion';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//initialize body parser
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

module.exports = app;