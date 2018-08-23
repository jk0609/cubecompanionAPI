var mtg = require('../utils/mtgsdk');
//imports model Card
const Card = require('../models/card.model.js');

//exports function called `create`
exports.create = function(req, res){
  // Create an instance of model Card
  var newCard = new Card({ name: 'TestCard' });
  console.log(newCard);

  // Save the new model instance, passing a callback
  newCard.save(function (err) {
    if (err) return handleError(err);
    // saved!
  });
}

exports.read = function(req, res){
  var results = Card.find({ 'name' : 'TestCard' });
  console.log(results);
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