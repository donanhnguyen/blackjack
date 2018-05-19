class Dealer {

    constructor () {
        this.hand = [];
        this.score = null;
        this.calculateWeight();
    }

    calculateWeight () {
        var total = null;
        this.hand.forEach(card => {
            total += card.weight;
        });
        this.hand.forEach((card) => {
            if ((card.value === "A") && (total + 10 <= 21)) {
                total += 10
            }
        })
        this.score = total;
        return this.score;
    }

    hit (card) {
        this.hand.push(card);
        this.calculateWeight();
    }




}

module.exports = Dealer;