'use strict';

// This time around we're selecting an ID, not a class.
// There are 2 ways to select an element when selecting by ID

// Selecting Elements

// Players
const score0Element = document.querySelector('#score--0'); // This uses querySelector, it requires you to specify what you're selecting in CSS syntax
const score1Element = document.getElementById('score--1'); // This uses getElement
// Active Player
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

// Dice
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');

// Starting conditions

// This sets our scores to zero
// score0Element.textContent = 0;
// score1Element.textContent = 0;
// diceElement.classList.add('hidden');
// // These are our accumulating scores
// const scores = [0, 0];
// let currentScore = 0;
// let activePlayer = 0;
// let playing = true;
let scores, currentScore, activePlayer, playing;

// Function Staging
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Reset score to zero
  //   scores.fill(0, 0);

  // Restore score text to default
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;

  // Reset dice image to hidden
  diceElement.classList.add('hidden');

  // Remove winner class
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  //   Reset player class
  player1Element.classList.remove('player--active');
  player0Element.classList.add('player--active');

  // Set playing to true
  playing = true;
};

init();

//////////////// Rolling dice functionality /////////////

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceElement.classList.remove('hidden');
    // This targets which image file we want to display when this happens
    diceElement.src = `dice-${dice}.png`;

    // 3. Check for rolled 1. Switch player.
    if (dice !== 1) {
      // Add dice # to score
      currentScore += dice;
      // Here we are grabbing the 'current--' class and dynamically switching between the two, depending on our 'current0Element' variable, denoting our active player
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // Switch next player

      // If our activePlayer variable is strictly equal to 0 then activePlayer = 1, if not then activePlayer = 0.

      /* 
    Data flow: activePlayer is fed data from 'currentScore', currentScore in turn gets data from the 'dice' variable which returns a value from 1 - 6.
    
    No matter what number it lands on, it passes the data down, but if that data is a '1', it triggers the else block that passes the '1' to the activePlayer variable, making the activePlayer1, instead of activePlayer0.
    */
      switchPlayer();
    }
  }
});

//////////////// Hold button functionality /////////////

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score.
    // We are storing player scores in the variable 'scores'.
    // So here, we are taking the activePlayer score and adding it to currentScore.
    console.log(scores);
    console.log(activePlayer);
    scores[activePlayer] += currentScore;
    // Ex. scores[1] = scores[1] + currentScore;

    // Displaying score after holding
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 20) {
      // Finish game if so
      playing = false;
      diceElement.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      console.log(scores); // TEST TEST TEST

      switchPlayer();
    }
  }
});

//////////////// Reset button functionality /////////////

btnNew.addEventListener('click', init);
