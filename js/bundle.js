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

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

const makeDeck = () => {

    let deck = [];

    for (let i=0; i<values.length; i++) {

        for (let j=0; j<suits.length; j++) {
            let card = null;
            let weight = parseInt(values[i]);
            if (values[i] == "J" || values[i] == "Q" || values[i] == "K") {
                 weight = 10;
            }
            if (values[i] == "A") {
                weight = 1;
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
        this.doublingDown = false;
        this.calculateWeight();
    }

    calculateWeight () {
        var total = null;
        this.hand.forEach(card => {
            total += card.weight;
        });
        this.hand.forEach((card) => {
            if ((card.value === "A") && (total + 10 <= 21)) {
                total += 10
            }
        })
        this.score = total;
        return this.score;
    }

    doubleDown () {
        this.bet *= 2;
        this.doublingDown = true;
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
        this.hand.forEach((card) => {
            if ((card.value === "A") && (total + 10 <= 21)) {
                total += 10
            }
        })
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
/***/ (function(module, exports, __webpack_require__) {

var renderUICards = __webpack_require__(7);

class View {

    constructor (game, rootEl) {
        this.game = game;
        this.HitButton = document.getElementById('hit-button');
        this.HitButton.addEventListener("click", this.hitClickHandler.bind(this));
        this.StartButton = document.getElementById('start-button');
        this.StartButton.addEventListener("click", this.startClickHandler.bind(this));
        this.StayButton = document.getElementById('stay-button');
        this.StayButton.addEventListener("click", this.stayClickHandler.bind(this));
        this.DoubleDownButton = document.getElementById("doubledown-button");
        this.DoubleDownButton.addEventListener("click", this.doubleDownHandler.bind(this));
        this.BetAmount = document.getElementById('bet-amount');
        this.Deck = document.getElementById("deck");
        //
        this.ResetChips = document.getElementById("resetBet");
        this.ResetChips.addEventListener("click", this.resetBet.bind(this));

        this.Chips = document.getElementById("chips");
        for (let i=0;i<this.Chips.children.length;i++) {
            let chip = this.Chips.children[i];
            chip.addEventListener("click", this.placeBet.bind(this));
        }
        //
        this.render();
    }

    placeBet (event) {
        var amount = parseInt(event.currentTarget.innerText);
        this.game.player.bet += amount;
        if (this.game.player.bet <= this.game.player.money) {
            this.render();
        } else {
            alert("You don't have that much money...");
            this.game.player.bet -= (amount);
        }
        this.render();
    }

    resetBet () {
        this.game.player.bet = 0;
        this.render();
    }

    doubleDownHandler () {
        if ((this.game.player.bet * 2) <= this.game.player.money) {
            this.game.player.doubleDown();
            this.game.hitPlayer();
        } else {
            alert("You can't double down, not enough money...");
        }
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
        if (this.game.player.money <= 0) {
            this.game.gameOver = true;
            alert("You lost all your money! Referesh the page to start over!");
        } else {
            if (this.game.player.bet !== 0 && this.game.player.bet > 0) {
                this.game.start();
            } else {
                this.game.message = "You have to bet something first";
            }
        }
        this.render();
    }

    gameOver () {
        if (this.game.gameOver) {
            let everything = document.getElementById("everything")
            everything.innerHTML = "Game Over :(";
        }
    }

    render () {
        this.gameOver();

        if (this.game.started) {
            this.StartButton.classList.add("hide-this-shit");
            this.HitButton.classList.remove('hide-this-shit');
            this.StayButton.classList.remove('hide-this-shit');
            this.DoubleDownButton.classList.remove("hide-this-shit");
            this.Chips.classList.add("hide-this-shit");
            this.ResetChips.classList.add("hide-this-shit");
        } else {
            this.StartButton.classList.remove('hide-this-shit');
            this.HitButton.classList.add('hide-this-shit');
            this.StayButton.classList.add('hide-this-shit');
            this.DoubleDownButton.classList.add("hide-this-shit");
            this.Chips.classList.remove("hide-this-shit");
            this.ResetChips.classList.remove("hide-this-shit");
        }

        if (this.game.player.doublingDown) {
            this.HitButton.classList.add("hide-this-shit");
        }

        document.getElementById('player-score').innerHTML = this.game.player.score;
        if (this.game.player.staying) {
            document.getElementById('dealer-score').innerHTML = this.game.dealer.score;
        } else {
            document.getElementById('dealer-score').innerHTML = "";
        }
        document.getElementById('money').innerHTML = "$" + this.game.player.money
        this.BetAmount.innerText = this.game.player.bet;
        if (this.game.player.doublingDown) {
            this.DoubleDownButton.setAttribute("disabled", "");
            this.DoubleDownButton.classList.add("faded");
        } else {
            this.DoubleDownButton.removeAttribute("disabled");
            this.DoubleDownButton.classList.remove("faded");
        }
        this.Deck.innerHTML = this.game.deck.length;
        renderUICards(this.game);
        this.renderMoneyGain();
    }

    renderMoneyGain () {
        var moneyGain = document.getElementById("moneyGain");
        moneyGain.innerHTML = this.game.moneyGain;
        if (this.game.wonOrNot) {
            moneyGain.classList.remove("red");
            moneyGain.classList.add("green");
        } else {
            moneyGain.classList.remove("green");
            moneyGain.classList.add("red")
        }
    }

}

module.exports = View;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

const renderUICards = (game) => {

    var gameMessage = document.getElementById("game-message")
    gameMessage.innerHTML = game.message;
    if (game.wonOrNot) {
        gameMessage.classList.remove("red");
        gameMessage.classList.add("green");
    } else {
        gameMessage.classList.remove('green');
        gameMessage.classList.add("red");
    }

    var dealerHand = document.getElementById("dealer-hand");
    var playerHand = document.getElementById("player-hand");

    dealerHand.innerHTML = "";

    for (let i = 0; i<game.dealer.hand.length; i++) {
        var dealerCard = game.dealer.hand[i];
        let card = document.createElement("div");
        if ((i === 1) && (!game.player.staying)) {
            card.classList.add('back-of-card');
        } else {
            card.classList.add("card"); 
            card.innerHTML = dealerCard.value;
            renderSuit(card, dealerCard);
        }
        if (dealerCard.suit === "Spades" || dealerCard.suit === "Clubs") {
            card.classList.add("black");
        } else {
            card.classList.add("red");
        }
        dealerHand.appendChild(card);
    }
    
    playerHand.innerHTML = "";

    for (let i = 0; i<game.player.hand.length; i++) {
        var playerCard = game.player.hand[i];
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = playerCard.value;
        if (playerCard.suit === "Spades" || playerCard.suit === "Clubs") {
            card.classList.add("black");
        } else {
            card.classList.add("red");
        }
        playerHand.appendChild(card);
        card.classList
    }
    
}

const renderSuit = (cardEle, cardJS) => {
    let suitEle = document.createElement("p");
    if (cardJS.suit === "Spades") {
        suitEle.innerHTML = "&#x2660";
        cardEle.appendChild(suitEle);
    } else if (cardJS.suit === "Clubs") {
        suitEle.innerHTML = "&#x2663";
        cardEle.appendChild(suitEle);
    } else if (cardJS.suit === "Diamonds") {
        suitEle.innerHTML = "&#x2666";
        cardEle.appendChild(suitEle);
    } else if (cardJS.suit === "Hearts") {
        suitEle.innerHTML = "&#x2665";
        cardEle.appendChild(suitEle);
    }
}

module.exports = renderUICards;

/***/ })
/******/ ]);