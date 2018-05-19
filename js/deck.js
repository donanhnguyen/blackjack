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