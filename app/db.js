//DB helper file
var mysql = require('mysql')
  , async = require('async')

//Defines db's based on names
var PRODUCTION_DB = 'cubecompanion'
  , TEST_DB = 'cubecompanion_test'

//Exports db mode options, what the strings are doesn't matter
exports.MODE_TEST = 'mode_test'
exports.MODE_PRODUCTION = 'mode_production'

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
    database: mode === exports.MODE_PRODUCTION ? PRODUCTION_DB : TEST_DB
  })

  state.mode = mode
  callback()
}

exports.get = function() {
  return state.pool
}

exports.drop = function(tables, done) {
  var pool = state.pool
  if (!pool) return done(new Error('Missing database connection.'))

  async.each(tables, function(name, cb) {
    pool.query('DELETE * FROM ' + name, cb)
  }, done)
}