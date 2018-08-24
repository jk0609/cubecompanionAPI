var mtg = require('mtgsdk');
//imports model Card
const Card = require('../models/card.model.js');

//exports function called `create`
exports.create = function(req, res){
  //Searchs official mtg api for card name, creates new Card instance based on result
  mtg.card.where({ name: req.body.name})
  .then(cards => {
    //Checks for a valid result
    if(!cards[0]) {
      res.send('Card not found');
    }
    else {
      //If found, create a new Card instance with properties from result
      var newCard = new Card({ 
        name: cards[0].name,
        color: cards[0].color, 
        cmc: cards[0].cmc
      });
  
      // Save the new model instance, passing a callback
      newCard.save(function (err) {
        if (err) return handleError(err);
        res.send('Card added!');
      });
    }
  });
}

exports.read = function(req, res){
  Card.find({}, function(err, cards){
    res.json(cards);
  });
}

exports.delete = function(req, res){
  Card.findByIdAndRemove(req.params.id, function(err){
    if (err) return next(err);
    res.send(req.params.id + ' deleted successfully!');
  });
} 