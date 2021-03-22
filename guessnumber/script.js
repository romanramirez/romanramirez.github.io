'use strict';

// Setting up a random number
let randomNumber = Math.trunc(Math.random() * 21);

// Setting up the score variable
let score = 20;

// High score
let highScore = 0;

//////////////// Refactoring ////////////////////////

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

//////////// Adding event handler on click ////////////////////

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  if (!guess) {
    displayMessage(`Don't be scared! Take a guess!`);

    // When player wins
  } else if (guess === randomNumber) {
    displayMessage(`The secret number was ${randomNumber}. You win!`);
    document.querySelector('.number').textContent = randomNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';

    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }

    // When guess is wrong (refactored)
  } else if (guess !== randomNumber) {
    if (score > 1) {
      displayMessage(
        guess > randomNumber
          ? `Your guess is too high!!!`
          : 'Your guess is too low'
      );
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('body').style.backgroundColor = '#8b0000';
      document.querySelector('.message').textContent = 'YOU LOST.';
    }
  }
});

// Or we could just restore our state variables on click
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  randomNumber = Math.trunc(Math.random() * 21);

  // Restoring text as well
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
});
