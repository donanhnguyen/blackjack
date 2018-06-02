const shuffle = (deck) => {
    for (let i = 0; i < 1000; i++) {
        var card1 = Math.floor((Math.random() * deck.length));
        var card2 = Math.floor((Math.random() * deck.length));
        var tempCard = deck[card1];
        deck[card1] = deck[card2];
        deck[card2] = tempCard;
    }
    return deck;
}

module.exports = shuffle;