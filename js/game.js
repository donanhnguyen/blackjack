var Deck = require('./deck.js');
var ShuffleDeck = require('./shuffle.js');
var Player = require('./player.js');
var Dealer = require('./dealer.js');

class Game {

    constructor () {
        this.deck = ShuffleDeck(Deck());
        this.player = new Player ();
        this.dealer = new Dealer ();
        this.started = false;
        this.gameOver = false;
    }

    start () {
        this.newGame();
    }

    newGame () {
        if (this.player.money <= 0) {
            this.gameOver = true;
            alert("You lost all your money! Referesh the page to start over!");
        } else {
            this.started = true;
            this.dealer.hand = [];
            this.player.hand = [];
            this.player.staying = false;
            this.deck = ShuffleDeck(Deck());
            this.dealCards();
        } 
    }

    checkIfPlayerBusted () {
        if (this.player.score > 21) {
            alert('Sorry, you lost! You went over 21.');
            this.player.money -= this.player.bet;
            this.started = false;
        } 
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
        
        console.log('players hand');
        console.log(this.player.hand);
        console.log(this.player.score);
    }

    checkWinner () {
        let winner = null;
        if (this.player.score === 21) {
            alert("21! YOU WIN!");
            winner = this.player;
        }   else if (this.dealer.score < this.player.score) {
            alert("You got a higher score! You Win!");
            winner = this.player;
        }   else if (this.dealer.score > 21) {
            alert("Dealer went over 21, you win!");
            winner = this.player;
        } else if (this.dealer.score > this.player.score && this.dealer.score < 21) {
            alert("Dealer got higher score than you, you lose!");
            winner = this.dealer;
        } else if (this.dealer.score === 21) {
            alert("Dealer got 21, you lose!");
            winner = this.dealer;
        } else if (this.dealer.score === this.player.score) {
            alert("Tie! You lose!");
            winner = this.dealer;
        }
       
        if (winner === this.player) {
            this.player.money += this.player.bet;
        } else {
            this.player.money -= this.player.bet;
        }
        this.started = false;
    }

    stay () {
        this.player.staying = true;
        while (this.dealer.score <= 16 && this.player.score !== 21) {
                this.hitDealer();
        }
        this.checkWinner();
    }

    hitDealer() {
        let card = this.deck.pop();
        this.dealer.hit(card);
        console.log('dealers hand');
        console.log(this.dealer.hand);
        console.log(this.dealer.score);
    }

    hitPlayer () {
        let card = this.deck.pop();
        this.player.hit(card);
        console.log('players hand');
        console.log(this.player.hand);
        console.log(this.player.score);
        this.checkIfPlayerBusted();
    }

}

module.exports = Game;