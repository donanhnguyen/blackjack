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
        this.BetAmount.addEventListener('change', this.handleBetAmount.bind(this));
        this.Deck = document.getElementById("deck");
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
                alert("You have to bet something first");
            }
        }
        this.render();
    }

    gameOver () {
        if (this.game.gameOver) {
            let everything = document.getElementById("everything")
            everything.innerHTML = "Game over bitch";
        }
    }

    render () {
        this.gameOver();

        if (this.game.started) {
            this.StartButton.classList.add("hide-this-shit");
            this.HitButton.classList.remove('hide-this-shit');
            this.StayButton.classList.remove('hide-this-shit');
            this.DoubleDownButton.classList.remove("hide-this-shit");
            this.BetAmount.setAttribute("readonly", "");
        } else {
            this.StartButton.classList.remove('hide-this-shit');
            this.HitButton.classList.add('hide-this-shit');
            this.StayButton.classList.add('hide-this-shit');
            this.DoubleDownButton.classList.add("hide-this-shit");
            this.BetAmount.removeAttribute("readonly");
        }
        //
        if (this.game.player.doublingDown) {
            this.HitButton.classList.add("hide-this-shit");
        }
        //
        document.getElementById('player-score').innerHTML = this.game.player.score;
        if (this.game.player.staying) {
            document.getElementById('dealer-score').innerHTML = this.game.dealer.score;
        } else {
            document.getElementById('dealer-score').innerHTML = "";
        }
        document.getElementById('money').innerHTML = "$" + this.game.player.money
        this.BetAmount.value = this.game.player.bet;
        if (this.game.player.doublingDown) {
            this.DoubleDownButton.setAttribute("disabled", "");
            this.DoubleDownButton.classList.add("faded");
        } else {
            this.DoubleDownButton.removeAttribute("disabled");
            this.DoubleDownButton.classList.remove("faded");
        }
        this.Deck.innerHTML = this.game.deck.length;
        this.renderUICards();

    }

    renderUICards () {
        var gameMessage = document.getElementById("game-message")
        gameMessage.innerHTML = this.game.message;

        var dealerHand = document.getElementById("dealer-hand");
        var playerHand = document.getElementById("player-hand");

        dealerHand.innerHTML = "";
        for (let i = 0; i<this.game.dealer.hand.length; i++) {
            var dealerCard = this.game.dealer.hand[i];
            let card = document.createElement("div");
            if ((i === 1) && (!this.game.player.staying)) {
                card.classList.add('back-of-card');
            } else {
                card.classList.add("card"); 
                card.innerHTML = dealerCard.value;
                this.renderSuit(card, dealerCard);
            }
            if (dealerCard.suit === "Spades" || dealerCard.suit === "Clubs") {
                card.classList.add("black");
            } else {
                card.classList.add("red");
            }
            dealerHand.appendChild(card);
        }
        
        playerHand.innerHTML = "";
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
            this.renderSuit(card, playerCard);
        }

    }

    renderSuit (cardEle, cardJS) {
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

}

module.exports = View;