console.log("black jack bitch");

var Game = require('./game.js');
var View = require('./view.js');

document.addEventListener("DOMContentLoaded", () => {
    const rootEl = document.getElementById('rootEl');
    var Game1 = new Game ();
    var Blackjack = new View (Game1, rootEl);
    
    ///--- testing
    Blackjack.game.start();
    Blackjack.render();

    
    //---testing
    
})

