//Card API functions
var mtg = require('mtgsdk');
//imports model Card
const cardModel = require('../models/card.model.js');

exports.getCard = function(req, res){
  console.log("Finding card at id "+req.params.id);
  var foundCard = cardModel.getCard(req.params.id);
  console.log(foundCard, 'controller');
  res.json(foundCard);
}

exports.populate = function(req, res){
  console.log("Retrieving cards...");
  cardModel.populate();
}






// //Read 1 card
// exports.getCard = function(req, res){
//   Card.findById(req.params.id, function(err,card){
//     if (err) return next(err);
//     res.json(card);
//   });
// }

// //Populate card list
// exports.populateCards = function(req, res){
//   //Code to grab ALL cards, at least until rate limited
//   // mtg.card.all()
//   // .on('data', function (card) {
//   //   callback
//   // });

//   //Wipes card db before populating again to avoid duplication
//   Card.remove({}, function(err) {
//     if (err) return next(err);
//   })

//   //Currently for testing, set to grab 100 cards
//   mtg.card.where({page: 1, pageSize: 100}) 
//   .then(cards => {
//     cards.forEach(function(card){
//       // Create model
//       var newCard = new Card({ 
//         name: card.name,
//         manaCost: card.manaCost,
//         cmc: card.cmc,
//         colors: card.colors, 
//         rarity: card.rarity,
//         cubes: []
//       });
    
//       // Save the new model instance, passing a callback
//       newCard.save(function(err){
//         if (err) return handleError(err);
//       });
//     });

//     res.send("Done adding cards");
//   });
// }

// exports.wipeCards = function(req, res){
//   //remove all cards from db
//   Card.remove({}, function(err) {
//     if (err) return next(err);
//     res.send('All cards deleted successfully!');
//   })
// }