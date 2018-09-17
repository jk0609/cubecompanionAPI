var mtg = require('mtgsdk');
//imports model Card
const Card = require('../models/card.model.js');

//exports function called `create`
exports.create = function(req, res){
  //Searchs official mtg api for card name, creates new Card instance based on result
  mtg.card.where({name: req.body.name})
  .then(cards => {
    //Checks for a valid result
    if(!cards[0]) {
      res.send('Card not found');
    }
    else {
      //If found, create a new Card instance with properties from result
      var newCard = new Card({ 
        name: cards[0].name,
        manaCost: cards[0].manaCost,
        cmc: cards[0].cmc,
        colors: cards[0].colors, 
        rarity: cards[0].rarity
      });
  
      // Save the new model instance, passing a callback
      newCard.save(function (err) {
        if (err) return handleError(err);
        res.send(cards[0]);
      });
    }
    // res.render('index');
  });
}

//read all cards
exports.read = function(req, res){
  Card.find({}, function(err, cards){
    res.json(cards);
  });
}

//delete card with id passed from req body
exports.delete = function(req, res){
  Card.findByIdAndRemove(req.params.id, function(err){
    if (err) return next(err);
    res.send(req.params.id + ' deleted successfully!');
  });
} 

//Populate card list
exports.populateCards = function(req, res){
  //Code to grab ALL cards, at least until rate limited
  // mtg.card.all()
  // .on('data', function (card) {
  //   callback
  // });

  //Wipes card db before populating again to avoid duplication
  Card.remove({}, function(err) {
    if (err) return next(err);
    res.send('All cards deleted successfully!');
  })

  //Currently for testing, set to grab 100 cards
  mtg.card.where({page: 1, pageSize: 100}) 
  .then(cards => {
    cards.forEach(function(card){
      // Create model
      var newCard = new Card({ 
        name: card.name,
        manaCost: card.manaCost,
        cmc: card.cmc,
        colors: card.colors, 
        rarity: card.rarity,
        cubes: []
      });
    
      // Save the new model instance, passing a callback
      newCard.save(function (err) {
        if (err) return handleError(err);
      });
    });

    res.send("Done adding cards");
  });
}

exports.wipeCards = function(req, res){
  //remove all cards from db
  Card.remove({}, function(err) {
    if (err) return next(err);
    res.send('All cards deleted successfully!');
  })
}
