//import mongoose
const mongoose = require('mongoose');

//assign mongoose Schema method to const
const Schema = mongoose.Schema;

//define card Schema (aka model)
//Includes property validation
let CardSchema = new Schema({
  name: {type: String, required: true},
  // color: {type: String, required: true}, 
  // cost: {type: Number, required: true}
})

//exports model
module.exports = mongoose.model('Card', CardSchema);