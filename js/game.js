var Deck = require('./deck.js');
var ShuffleDeck = require('./shuffle.js');
var Player = require('./player.js');
var Dealer = require('./dealer.js');

class Game {

    constructor () {
        this.deck = ShuffleDeck(Deck());
        this.player = new Player ();
        this.dealer = new Dealer ();
    }


    start () {
        this.dealCards();
    }

    dealCards () {
        var players = [this.player, this.dealer];
        let card = null;
        for (let i=0; i<2; i++) {
            for (let j=0; j<players.length; j++) {
                card = this.deck.pop();
                players[j].hand.push(card);
            }
        }
        this.player.calculateWeight();
        this.dealer.calculateWeight();
        console.log(this.player.hand);
        console.log(this.player.score);

    }

    hitPlayer () {
        let card = this.deck.pop();
        this.player.hit(card);
        console.log(this.player.hand);
        console.log(this.player.score);
    }






}

module.exports = Game;