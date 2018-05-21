class Player {

    constructor () {
        this.hand = [];
        this.money = 100;
        this.staying = false;
        this.score = null;
        this.bet = 0;
        this.doublingDown = false;
        this.calculateWeight();
    }

    submitBet (amount) {
        if (amount <= this.money) {
            this.bet = amount;
        } else {
            alert("You don't have that much money...");
            this.bet = 0;
        }
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

    doubleDown () {
        this.bet *= 2;
        this.doublingDown = true;
    }

    hit (card) {
        this.hand.push(card);
        this.calculateWeight();
    }

}

module.exports = Player;