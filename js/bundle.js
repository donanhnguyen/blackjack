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

document.addEventListener("DOMContentLoaded", () => {
    const rootEl = document.getElementById('rootEl');
    var Game1 = new Game ();



    ///--- testing
    Game1.dealCards();
   
    document.getElementById('player-score').innerHTML = Game1.player.score;
    document.getElementById('dealer-score').innerHTML = Game1.dealer.score;
    
    document.getElementById('hit-button').addEventListener("click", () => {
        Game1.hitPlayer();
        document.getElementById('player-score').innerHTML = Game1.player.score;
        document.getElementById('dealer-score').innerHTML = Game1.dealer.score;
    })
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
        // console.log(this.player.hand);
        // console.log(this.player.score);

    }

    hitPlayer () {
        let card = this.deck.pop();
        this.player.hit(card);
        // console.log(this.player.hand);
        // console.log(this.player.score);
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
        this.wager = 0;
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

/***/ })
/******/ ]);