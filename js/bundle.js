/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Game = __webpack_require__(1);
var View = __webpack_require__(6);

document.addEventListener("DOMContentLoaded", () => {
    const rootEl = document.getElementById('rootEl');
    var Game1 = new Game ();
    var Blackjack = new View (Game1, rootEl);
    
    ///--- testing
    
    Blackjack.render();

    
    //---testing
    
})



/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Deck = __webpack_require__(2);
var ShuffleDeck = __webpack_require__(3);
var Player = __webpack_require__(4);
var Dealer = __webpack_require__(5);

class Game {

    constructor () {
        this.deck = ShuffleDeck(Deck());
        this.player = new Player ();
        this.dealer = new Dealer ();
        this.started = false;
        this.gameOver = false;
        this.message = "";
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
            this.message = 'Sorry, you lost! You went over 21.';
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
            this.message = "Tie! You lose!";
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

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

function makeDeck () {

    let deck = [];

    for (let i=0; i<values.length; i++) {

        for (let j=0; j<suits.length; j++) {
            let card = null;
            let weight = parseInt(values[i]);
            if (values[i] == "J" || values[i] == "Q" || values[i] == "K") {
                 weight = 10;
            }
            if (values[i] == "A") {
                weight = 11;
            }
                
            card = {
                value: values[i],
                suit: suits[j],
                weight: weight,
            }   
            deck.push(card);

        }

    }
    return deck;
}

module.exports = makeDeck;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

function shuffle (deck) {
    // for 1000 turns
    // switch the values of two random cards
    for (var i = 0; i < 1000; i++) {
    
        var location1 = Math.floor((Math.random() * deck.length));
        var location2 = Math.floor((Math.random() * deck.length));
        var tmp = deck[location1];

        deck[location1] = deck[location2];
        deck[location2] = tmp;
    }

    return deck;
}

module.exports = shuffle;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

class Player {

    constructor () {
        this.hand = [];
        this.money = 100;
        this.staying = false;
        this.score = null;
        this.bet = 0;
        this.calculateWeight();
    }

    submitBet (amount) {
        if (amount <= this.money) {
            this.bet = amount;
        } else {
            alert("You don't have that much money...")
        }
    }

    calculateWeight () {
        var total = null;
        this.hand.forEach(card => {
            total += card.weight;
        });
        this.score = total;
        return this.score;
    }

    hit (card) {
        this.hand.push(card);
        this.calculateWeight();
    }




}

module.exports = Player;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

class Dealer {

    constructor () {
        this.hand = [];
        this.score = null;
        this.calculateWeight();
    }

    calculateWeight () {
        var total = null;
        this.hand.forEach(card => {
            total += card.weight;
        });
        this.score = total;
        return this.score;
    }

    hit (card) {
        this.hand.push(card);
        this.calculateWeight();
    }




}

module.exports = Dealer;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

class View {

    constructor (game, rootEl) {
        this.game = game;
        this.rootEl = rootEl;
        this.HitButton = document.getElementById('hit-button');
        this.HitButton.addEventListener("click", this.hitClickHandler.bind(this));

        this.StartButton = document.getElementById('start-button');
        this.StartButton.addEventListener("click", this.startClickHandler.bind(this));

        this.StayButton = document.getElementById('stay-button');
        this.StayButton.addEventListener("click", this.stayClickHandler.bind(this));

       
        this.BetAmount = document.getElementById('bet-amount');
        this.BetAmount.addEventListener('change', this.handleBetAmount.bind(this));
     
        this.Deck = document.getElementById("deck");
    
        this.render();
    }

    handleBetAmount (event) {
        let betAmount = parseInt(event.currentTarget.value);
        this.game.player.submitBet(betAmount);
        this.render();
    }

    betClickHandler () {
        this.game.player.submitBet(this.BetAmount.value);
        this.render();
    }

    stayClickHandler () {
        this.game.stay();
        this.render();
    }

    hitClickHandler () {
        this.game.hitPlayer();
        this.render();
    }

    startClickHandler () {
        if (this.game.player.bet !== 0) {
            this.game.start();
        } else {
            alert("You have to bet something first");
        }
        this.render();
    }

    gameOver () {
        if (this.game.gameOver) {
            $("#everything").empty();
            document.getElementById("everything").innerHTML = "Game Over :(";
        }
    }

    render () {
        this.gameOver();

        if (this.game.started) {
            this.StartButton.classList.add("hide-this-shit");
            this.HitButton.classList.remove('hide-this-shit');
            this.StayButton.classList.remove('hide-this-shit');
            this.BetAmount.setAttribute("readonly", "");
        } else {
            this.StartButton.classList.remove('hide-this-shit');
            this.HitButton.classList.add('hide-this-shit');
            this.StayButton.classList.add('hide-this-shit');
            this.BetAmount.removeAttribute("readonly");
        }

        document.getElementById('player-score').innerHTML = this.game.player.score;
        if (this.game.player.staying) {
            document.getElementById('dealer-score').innerHTML = this.game.dealer.score;
        } else {
            document.getElementById('dealer-score').innerHTML = "";
        }
        document.getElementById('money').innerHTML = "$" + this.game.player.money
        this.Deck.innerHTML = this.game.deck.length;
        this.renderUICards();

    }

    renderUICards () {

        var gameMessage = document.getElementById("game-message")
        gameMessage.innerHTML = this.game.message;

        var dealerHand = document.getElementById("dealer-hand");
        var playerHand = document.getElementById("player-hand");

        var dHand = $("#dealer-hand");
        dHand.empty();

        for (let i = 0; i<this.game.dealer.hand.length; i++) {
            var dealerCard = this.game.dealer.hand[i];
            let card = document.createElement("div");

            if ((i === 1) && (!this.game.player.staying)) {
                card.classList.add('back-of-card');
            } else {
                card.classList.add("card"); 
                card.innerHTML = dealerCard.value;
            }
            
           
            if (dealerCard.suit === "Spades" || dealerCard.suit === "Clubs") {
                card.classList.add("black");
            } else {
                card.classList.add("red");
            }
            dealerHand.appendChild(card);
        }

        var pHand = $("#player-hand");
        pHand.empty();

        for (let i = 0; i<this.game.player.hand.length; i++) {
            var playerCard = this.game.player.hand[i];
            let card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = playerCard.value;
            if (playerCard.suit === "Spades" || playerCard.suit === "Clubs") {
                card.classList.add("black");
            } else {
                card.classList.add("red");
            }
            playerHand.appendChild(card);
        }

    }

}

module.exports = View;

/***/ })
/******/ ]);