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
        this.message = "";
        this.moneyGain = "";
        this.wonOrNot = null;
    }

    start () {
        this.newGame();
    }

    newGame () {
        if (this.player.money <= 0) {
            this.gameOver = true;
            alert("You lost all your money! Referesh the page to start over!");
        } else {
            this.message = '';
            this.moneyGain = "";
            this.wonOrNot = null;
            this.started = true;
            this.dealer.hand = [];
            this.player.hand = [];
            this.player.staying = false;
            this.player.doublingDown = false;
            this.deck = ShuffleDeck(Deck());
            this.dealCards();
        } 
    }

    checkIfPlayerBusted () {
        if (this.player.score > 21) {
            this.message = 'Sorry, you lost! You went over 21.';
            this.player.money -= this.player.bet;
            this.moneyGain = "-" + this.player.bet;
            this.wonOrNot = false;
            this.started = false;
            this.player.bet = 0;
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
        if (this.player.score === 21) {
            this.message ="BLACKJACK!";
            this.player.money += this.player.bet;
            this.moneyGain = "+" + this.player.bet;
            this.wonOrNot = true;
            this.started = false;
        }
    }

    checkWinner () {
        let winner = null;
        if (this.player.score === 21) {
            this.message ="21! YOU WIN!";
            winner = this.player;
        }   else if (this.dealer.score < this.player.score) {
            this.message = "You got a higher score! You Win!";
            winner = this.player;
        }   else if (this.dealer.score > 21) {
            this.message = "Dealer went over 21, you win!";
            winner = this.player;
        } else if (this.dealer.score > this.player.score && this.dealer.score < 21) {
            this.message = "Dealer got higher score than you, you lose!";
            winner = this.dealer;
        } else if (this.dealer.score === 21) {
            this.message = "Dealer got 21, you lose!";
            winner = this.dealer;
        } else if (this.dealer.score === this.player.score) {
            this.message = "Tie!";
        }
       
        if (winner === this.player) {
            this.player.money += this.player.bet;
            this.moneyGain = "+" + this.player.bet;
            this.wonOrNot = true;
        } else if (winner === this.dealer) {
            this.player.money -= this.player.bet;
            this.moneyGain = "-" + this.player.bet;
            this.wonOrNot = false;
            this.player.bet = 0;
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
    }

    hitPlayer () {
        let card = this.deck.pop();
        this.player.hit(card);
        this.checkIfPlayerBusted();
    }

}

module.exports = Game;