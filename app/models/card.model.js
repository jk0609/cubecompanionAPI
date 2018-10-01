var mtg = require('mtgsdk');
var db = require('../db.js')

class Card {
  constructor(name, manaCost, cmc, colors, rarity) {
    this.name = name;
    this.manaCost = manaCost;
    this.cmc = cmc;
    this.colors = colors;
    this.rarity = rarity;
  }
}


function getCard(id, callback) {
  db.get().query('SELECT * FROM card WHERE id = ?', id, function(err, result){
    if (err) throw err;
    var newCardProps = result[0];
    // creates new Card class instance based on query results
    let newCard = new Card(
      newCardProps['name'],
      newCardProps['manaCost'],
      newCardProps['cmc'],
      newCardProps['colors'],
      newCardProps['rarity']
    )

    // takes newCard and runs it through callback defined in controller
    callback(newCard);
  });
}

exports.getCard = getCard;

exports.populate = function(done) {
  mtg.card.where({page: 1, pageSize: 10}) 
  .then(cards => {
    cards.forEach(function(card){
      var newCardProps = [
        card.name,
        card.manaCost,
        card.cmc,
        card.colors.join(''), 
        card.rarity,
        //cubes
      ]

      // console.log(newCardProps);

      // db.get().query('INSERT INTO cards(name, manaCost, cmc, colors, rarity) VALUES (?,?,?,?,?)', newCardProps, function(err, result) {
      //   if (err) return err;
      //   console.log(result);
      // })
      db.get().query('INSERT INTO card(name, manaCost, cmc, colors, rarity) VALUES (?,?,?,?,?)', newCardProps, function(err) {
        if (err) console.log(err);
      })
    });

    console.log('Cards populated!');
  });
}

// exports.wipeCards = function(done) {
//   db.get().query('SELECT * FROM comments', function (err, rows) {
//     if (err) return done(err)
//     done(null, rows)
//   })
// }