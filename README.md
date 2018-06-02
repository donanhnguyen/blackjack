#### BLACKJACK, BY DON NGUYEN

![alt text](https://media.giphy.com/media/5R0yySN75A48x4jvqH/giphy.gif)

[Live Game](https://thedonwind69.github.io/blackjack/index.html)

BlackJack, (also known as "21"), is an intuitive card game between a dealer and several players or only one player. 

https://en.wikipedia.org/wiki/Blackjack

Interactive game built with `Vanilla Javascript (ES5, ES6)`, `HTML`, `CSS`.

### Rules of the game:

The dealer and player are both dealt 2 cards. The goal is to:
1. Get 21, or as close as possible to 21 without going over (AKA "Busting").
2. If you go over 21, you lose. If dealer goes over 21, they lose. 
3. If neither of you goes over 21, the one with the higher score wins.

### Features:

### 1. Betting: 

Click on chip icons below the table depending on how much you want to wager before each round. Bet amount is incremented based on which chip you click.
1. White Chips: $1
2. Red Chips: $5
3. Blue Chips: $10
4. Green Chips: $25
5. Click 'Reset Bet' to clear your bet to zero in case you want to start over.

### 2. Playing the Game: 

Click 'New Game' button to start the round.
1. Hit: dealer will deal you another card.
2. Stay: dealer will stop dealing you any cards, and begin dealing cards to himself until he either reaches the highest score to 21, or goes over 21.
3. Doubledowm: dealer will hand you only 1 more card and your bet amount doubles, smart move to move if you are confident that the next card will bring you to 21 or close. But, if your next card doesn't bring you anywhere near 21, then oops! You lose double the original bet amount.

### 3. Score: 
If the dealer loses, you win your bet amount and it's added to your chip stack. If you lose, you lose the amount of your best. 
- If your money is completely gone, game is over, refresh the page to start all over again.
- You can play as long as you have money!

### Code Highlights:

### 1. Creating the deck

<div>
    <img src="/images/screen1.png" width="500px" height="450px"</img> 
</div>

Created 2 arrays, one with 4 Suits and one with 13 Faces. Loop through both arrays and create 4 cards on each suit with each face value. Card is created as Object.

### 2. Shuffling the deck

<div>
    <img src="/images/screen2.png" width="500px" height="200px"</img> 
</div>

Loop through deck 1000 times and randomly switches the value of 2 random cards.

### 3. Calculating hand score

<div>
    <img src="/images/screen3.png" width="500px" height="250px"</img> 
</div>

Loop through player or dealer's hand and calculate total score. Aces are worth 1 point, but if total score does not go over 21 with an Ace, then Ace is worth 11.