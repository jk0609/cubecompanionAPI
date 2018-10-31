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
    .then((result) => {
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
    })
    .catch( err => {
      res.send(err);
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
        .catch( err => {
          res.send(err);
        });
    });

    console.log('Cards populated!');
  });
}