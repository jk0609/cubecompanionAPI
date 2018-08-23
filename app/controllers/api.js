// var db = require('../utils/db');
var mtg = require('../utils/mtgsdk');

// req can capture user input in the req object
exports.results = function(req, res){
  var query = req.query.q;
  //if there is a user query, 
  if(query) {
    //Adds query into the 'cards' collection in the db, then saves updated db
    db.getCollection('cards').insert({name: query});
    db.saveDatabase();

    //Queries mtg api for cards with name == query
    mtg.card.where({ name: query })
    .then(cards => {
        //Returns cards as json
        console.log(cards);
        res.json(cards);
    })
  } else {
    res.send('Error');
  }
}