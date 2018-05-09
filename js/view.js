class View {

    constructor (game, rootEl) {
        this.game = game;
        this.rootEl = rootEl;
        this.HitButton = document.getElementById('hit-button');
        this.HitButton.addEventListener("click", this.hitClickHandler.bind(this));

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
        document.getElementById('player-score').innerHTML = this.game.player.score;
        document.getElementById('dealer-score').innerHTML = this.game.dealer.score;
        document.getElementById('money').innerHTML = this.game.player.money
    }

}

module.exports = View;