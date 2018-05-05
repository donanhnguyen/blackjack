var Deck = require('./deck.js');
var ShuffleDeck = require('./shuffle.js');

class Game {

    constructor () {
        this.yourHand = [];
        this.deck = ShuffleDeck(Deck());
        this.player = null;
        this.dealer = null;
    }

    run () {

    }



}

module.exports = Game;