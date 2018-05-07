console.log("black jack bitch");

var Game = require('./game.js');

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

