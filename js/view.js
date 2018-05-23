var renderUICards = require("./cardsUI.js");

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