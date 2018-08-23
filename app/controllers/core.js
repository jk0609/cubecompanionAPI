// var db = require('../utils/db');
var mtg = require('../utils/mtgsdk');

//exports function called `home`
exports.home = function(req, res){
  //loads db (defined in db.js helper) then runs callback
  db.loadDatabase({}, function(){
    //runs results.render passing in template filename and db data
     res.render('index', {cards: db.getCollection('cards').data})
  })
}

//No longer function. Keeping for reference.

// exports.top = function(req, res){
//   db.loadDatabase({}, function(){
//     res.render('top', {terms: db.getCollection('searches').data})
//  })
// }

// // req can capture user input in the req object
// exports.results = function(req, res){
//   var query = req.query.q;
//   //if there is a user query, 
//   if(query) {
//     //Adds query into the 'searches' collection in the db, then saves updated db
//     db.getCollection('searches').insert({term: query});
//     db.saveDatabase();

//     //Queries mtg api for cards with name == query
//     mtg.card.where({ name: query })
//     .then(cards => {
//         //render the results page using results template, passing in array of card results
//         console.log(cards);
//         res.render('results', {query: query, cards: cards});
//     })
//   } else {
//     res.send('Error');
//   }
// }