//Card API functions
var mtg = require('mtgsdk');
var db = require('../db.js')

class Card {
  constructor(name, mana_cost, cmc, colors, rarity) {
    this.name = name;
    this.mana_cost = mana_cost;
    this.cmc = cmc;
    this.colors = colors;
    this.rarity = rarity;
  }
}

exports.getCard = function(req, res){
  db.query('SELECT * FROM cards WHERE card_id = ?', req.params.id)
    .then(function(err, result){
      if (err) res.send(err);
      else {
        var newCardProps = result[0];
        // creates new Card class instance based on query results
        let foundCard = new Card(
          newCardProps['name'],
          newCardProps['mana_cost'],
          newCardProps['cmc'],
          newCardProps['colors'],
          newCardProps['rarity']
        )
  
        res.json(foundCard);
      }
    });
}

exports.populate = function(req, res){
  console.log("Retrieving cards...");
  mtg.card.where({page: 1, pageSize: 10}) 
  .then(cards => {
    cards.forEach(function(card){
      var newCardProps = [
        card.name,
        card.manaCost,
        card.cmc,
        card.colors.join(''), 
        card.rarity,
      ]

      db.query('INSERT INTO card(name, mana_cost, cmc, colors, rarity) VALUES (?,?,?,?,?)', newCardProps)
        .then(function(err) {
          if (err) res.send(err);
        });
    });

    console.log('Cards populated!');
  });
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