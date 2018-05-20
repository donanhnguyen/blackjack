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
                this.renderSuit(card, dealerCard);
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