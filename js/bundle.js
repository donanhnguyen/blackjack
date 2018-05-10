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

console.log("black jack bitch");

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
    }


    start () {
        this.dealCards();
        this.started = true;
    }

    newGame () {
        this.dealer.hand = [];
        this.player.hand = [];
        this.player.staying = false;
        this.player.bet = 0;
        this.deck = ShuffleDeck(Deck());
        this.dealCards();
    }

    checkIfPlayerBusted () {
        if (this.player.score > 21) {
            alert('Sorry, you lost! You went over 21.');
            this.newGame();
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
        if (this.dealer.score < this.player.score) {
            alert("You got a higher score! You Win!");
        } 
            else if (this.dealer.score > this.player.score && this.dealer.score < 21) {
            alert("Dealer got higher score than you, you lose!");
        } else if (this.dealer.score > 21) {
            alert("Dealer went over 21, you win!");
        } else if (this.dealer.score = 21) {
            alert("Dealer got 21, you lose!");
        } else if (this.dealer.score = this.player.score) {
            alert("Tie! You lose!");
        }
        this.newGame();

    }

    stay () {
        this.player.staying = true;
        while (this.dealer.score <= 17) {
            if (this.dealer.score <= 16) {
                this.hitDealer();
            }
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
        this.Deck = document.getElementById("deck");
    
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
        this.game.start();
        this.render();
    }

    render () {
        if (this.game.started) {
            this.StartButton.classList.add("hide-this-shit");
            this.HitButton.classList.remove('hide-this-shit');
        }
        document.getElementById('player-score').innerHTML = this.game.player.score;
        document.getElementById('dealer-score').innerHTML = this.game.dealer.score;
        document.getElementById('money').innerHTML = this.game.player.money
        this.Deck.innerHTML = this.game.deck.length;
    }

}

module.exports = View;

/***/ })
/******/ ]);