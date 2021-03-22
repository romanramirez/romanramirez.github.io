'use strict';

// Players
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');

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
    diceElement.src = `dice-${dice}.png`;

    // 3. Check for rolled 1. Switch player.
    if (dice !== 1) {
      // Add dice # to score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // Switch next player
      switchPlayer();
    }
  }
});

//////////////// Hold button functionality /////////////

btnHold.addEventListener('click', function () {
  if (playing) {
    console.log(scores);
    console.log(activePlayer);
    scores[activePlayer] += currentScore;

    // Displaying score after holding
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceElement.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

//////////////// Reset button functionality /////////////

btnNew.addEventListener('click', init);
