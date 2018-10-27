//DB helper file
var mysql = require('mysql');

//Defines db's based on names
var PRODUCTION_DB = 'cubecompanion'
  , TEST_DB = 'cubecompanion_test'

var state = {
  pool: null,
  mode: null,
}

//Exports connect method,
exports.connect = function(mode, callback) {
  state.pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASS,
    //Chooses prod or test db based on mode passed method
    database: mode === 'MODE_PROD' ? PRODUCTION_DB : TEST_DB
  })

  state.mode = mode
  callback()
}

exports.get = function() {
  return state.pool
}

exports.query = function(sql, args) {
  return new Promise(function(resolve, reject) {
    // Passing in SQL query, args and anonymous callback
    state.pool.query(sql, args, function(err, rows) {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

exports.close = function() {
  return new Promise(function(resolve, reject) {
      state.pool.end( err => {
          if (err) return reject( err );
          resolve();
      } );
  } );
}