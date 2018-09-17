//import card model
const Cube = require('./cube.model.js');

//import mongoose
const mongoose = require('mongoose');

//assign mongoose Schema method to const
const Schema = mongoose.Schema;

//define card Schema (aka model)
//Includes property validation
let CardSchema = new Schema({
  name: {type: String, required: true},
  manaCost: {type: Array, required: true},
  cmc: {type: Number, required: true},  
  colors: {type: Array, required: true}, 
  rarity: {type: String, required: true},
  cubes: [{type: Schema.Types.ObjectId, ref: "Cube"}]
})

//exports model
module.exports = mongoose.model('Card', CardSchema);

//Available properties from mtgsdk
// multiverseid
// layout
// names
// type
// types
// subtypes
// text
// flavor
// artist
// number
// power
// toughness
// reserved
// rulings
// printings
// originalText
// originalType
// legalities
// source
// imageUrl
// set
// id