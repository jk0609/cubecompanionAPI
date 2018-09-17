//import card model
const Card = require('./card.model.js');

//import mongoose
const mongoose = require('mongoose');

//assign mongoose Schema method to const
const Schema = mongoose.Schema;

//define card Schema (aka model)
//Includes property validation
let CubeSchema = new Schema({
  user: {type: String, required: true},
  name: {type: String, required: true}, 
  size: {type: Number, required: true},
  cards: [{type: Schema.Types.ObjectId, ref: "Card"}]
})

//exports model
module.exports = mongoose.model('Cube', CubeSchema);