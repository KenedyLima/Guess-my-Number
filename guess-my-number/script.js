'use strict';

let secretNumber = Math.trunc(Math.random() * 20 + 1);
console.log(secretNumber);

let highScore = 0;
let score = 20;
let won = false;

const changeMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const decreaseScore = function () {
  score--;
  document.querySelector('.score').textContent = score;
};

const lostTheGame = function () {
  showSecretNumber();
  changeMessage('💥 You lost the game');

  document.querySelector('body').style.backgroundColor = '#dc2626';
  document.querySelector('.number').style.width = '30rem';
};

const showSecretNumber = function () {
  document.querySelector('.number').textContent = secretNumber;
};

const gameAlternatives = function (guess) {
  console.log(guess, typeof guess);

  //If there is no number
  if (!guess) {
    changeMessage('🚫 No number!');

    //If player wins the game
  } else if (guess === secretNumber) {
    showSecretNumber();
    changeMessage('🏆 You won the game!');

    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    won = true;
    //If it is too high
  } else if (guess > secretNumber) {
    if (score > 1) {
      changeMessage('📈 Too High');
      decreaseScore();
    } else {
      decreaseScore();
      lostTheGame();
    }

    //If it is too low
  } else if (guess < secretNumber) {
    if (score > 0) {
      changeMessage('📉 Too Low');
      decreaseScore();
    } else {
      decreaseScore();
      lostTheGame();
    }
  }
};

const resetGame = function () {
  if (score > highScore && won) {
    highScore = score;
    document.querySelector('.highscore').textContent = highScore;
  }
  score = 20;
  won = false;
  document.querySelector('.score').textContent = '20';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.guess').value = '';
  document.querySelector('.number').textContent = '?';
  secretNumber = Math.trunc(Math.random() * 20 + 1);
  changeMessage('Start guessing...');
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  gameAlternatives(guess);
});

document.querySelector('.again').addEventListener('click', function () {
  resetGame();
});
