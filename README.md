# BLACKJACK, BY DON ANH NGUYEN

![alt text](https://media.giphy.com/media/5R0yySN75A48x4jvqH/giphy.gif)

[Live Game](https://donanhnguyen.github.io/blackjack/)

BlackJack, (also known as "21"), is an intuitive card game between a dealer and several players or only one player. 

Rules of the game:
https://en.wikipedia.org/wiki/Blackjack

- Interactive game built with `Vanilla Javascript (ES5, ES6)`, `HTML`, `CSS`, `Webpack`, and `object-oriented` design for state management without using any external libraries.

<h1>How to run locally:</h1>

Step 1: In your local terminal, git clone the project into an empty folder:
```
git clone https://github.com/donanhnguyen/blackjack.git
```
Step 2: CD into the new folder that was just created:
```
cd blackjack
```
Step3: open the index.html file and you should see your web browser opening to the game:
```
open index.html
```

<h1>Features:</h1>

## 1. Betting: 

Click on chip icons below the table depending on how much you want to wager before each round. Bet amount is incremented based on which chip you click.
1. White Chips: $1
2. Red Chips: $5
3. Blue Chips: $10
4. Green Chips: $25
5. Click 'Reset Bet' to clear your bet to zero in case you want to start over.

## 2. Playing the Game: 

Click 'New Game' button to start the round.
1. Hit: dealer will deal you another card.
2. Stay: dealer will stop dealing you any cards, and begin dealing cards to himself until he either reaches the highest score to 21, or goes over 21.
3. Doubledowm: dealer will hand you only 1 more card and your bet amount doubles, smart move to move if you are confident that the next card will bring you to 21 or close. But, if your next card doesn't bring you anywhere near 21, then oops! You lose double the original bet amount.

## 3. Score: 
If the dealer loses, you win your bet amount and it's added to your chip stack. If you lose, you lose the amount of your best. 
- If your money is completely gone, game is over, refresh the page to start all over again.
- You can play as long as you have money!

## 4. Instructions on playing the game:
1. You will start with $100. You have to click on the chip icons to increment how much you want your starting bet to be, and only then can you click "New Game" to begin.
2. You will be dealt 2 cards from the dealer. If you'd like to stay, click "stay". If you'd like to hit for another card, click "hit".
3. If after hitting, you go over 21, then you lost your money for the hand. In order to keep playing, you must increase your bet again by clicking on the chip icons. Then, you can click "New Game" to begin another round.
4. You can repeat this process for how ever many times until you run out of money. Then the game is over and you'd need to refresh the page.

## Code Highlights:

### 1. Creating the deck

<div>
    <img src="/images/screen1.png" width=100%></img> 
</div>

Created 2 arrays, one with 4 Suits and one with 13 Faces. Loop through both arrays and create 4 cards on each suit with each face value. Card is created as Object.

### 2. Shuffling the deck

<div>
    <img src="/images/screen2.png" width=100%</img> 
</div>

Loop through deck 1000 times and randomly switches the value of 2 random cards.

### 3. Calculating hand score

<div>
    <img src="/images/screen3.png" width=100%</img> 
</div>

Loop through player or dealer's hand and calculate total score. Aces are worth 1 point, but if total score does not go over 21 with an Ace, then Ace is worth 11.