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

    var droppedCards = {};
    for (let i = 0; i<game.player.hand.length; i++) {
        droppedCards[i] = true;
    }

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
        renderSuit(card, playerCard);
    }

    if (game.player.hand.length > 0) {

        var mostRecentCard = playerHand.children[game.player.hand.length - 1];
        if (!droppedCards[game.player.hand.length - 1]) {
            mostRecentCard.classList.add("cardDrop");
            droppedCards[game.player.hand.length - 1] = true;
        }
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