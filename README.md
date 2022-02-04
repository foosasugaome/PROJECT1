# Claw Crane : An arcade game

## About the game

A claw crane, claw machine, toy crane or skill crane is a type of arcade game known as a merchandiser, commonly found in video arcades, supermarkets, restaurants, movie theaters, shopping malls, and bowling alleys.


## How it is played

* Move the arm horizontally and/or vertically to get to the location of target toy.
* Arm will move when button is pressed and will stop on release.
* Arm will only move twice, once horizontally and again once vertically (or vice versa).
* Player can choose which direction they want to go first.
* You can have n number of turns. Tries will be labeled as tokens.
* You will have to move the arm before timer ends.
* Every time player successfuly grabs a toy, he can earn more turns/tokens.
* Game ends when player runs out of turns/tokens.

## Tech Spec

The game will be created using HTML5 canvas, Javascript. DOM events will handle the user input. User input could be a keyboard press or mouse click on the button. Collision will happen not on the edges of 2 elements (claw and toy) but on the center point the elements. This is a design choice to increase difficulty of the game. 

Turns/tokens will be handled by a class. End of turn will be triggered when timer runs out. The setinterval function will be used for this.

The location of the target element(toy) will be coming from a randomizer function, it will also be assigned a random value which can be added to the players turn/token. 



![wireframe](https://i.imgur.com/nf3txe0.jpg)

## MVP

* Create a canvas as play area.
* Create a button to start game.
* Create a timer for each turn.
* Randomly place target on the canvas.
* Create two buttons for controls of the claw.
* Count number of turns/tokens. Add or subtract based on result of last turn.
* Toys will have random exchange values to be traded for turns/tokens. 


