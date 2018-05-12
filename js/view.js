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
            this.StayButton.classList.remove('hide-this-shit');
        }
        document.getElementById('player-score').innerHTML = this.game.player.score;
        document.getElementById('dealer-score').innerHTML = this.game.dealer.score;
        document.getElementById('money').innerHTML = this.game.player.money
        this.Deck.innerHTML = this.game.deck.length;
    }

}

module.exports = View;