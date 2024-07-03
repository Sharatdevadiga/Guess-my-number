'use strict';

// message, score, guess, check;
let body = document.querySelector('body');
function get(className) {
  return document.querySelector(`.${className}`);
}

const check = get('check');
let message = get('message');
let score = get('score');
let number = get('number');
let guessEl = get('guess');
let highScoreEl = get('highscore');

let secretNumber;
updateSecretNum();

let currentScore = 20;

function updateMessage(text) {
  message.textContent = text;
}
function updateSecretNum() {
  secretNumber = Math.trunc(Math.random() * 20 + 1);
}
function updateNum(value = secretNumber) {
  number.textContent = value;
}
function updateScore() {
  score.textContent = currentScore;
}
function updateHighScore() {
  highScoreEl.textContent = Math.max(
    currentScore,
    Number(highScoreEl.textContent)
  );
}
function updateBackground(color, width = 15) {
  body.style.backgroundColor = `${color}`;
  number.style.width = `${width}rem`;
}

// check button
check.addEventListener('click', () => {
  let guess = Number(guessEl.value);
  // no nnumber
  if (!guess) {
    updateMessage('No number');
  } else if (guess === secretNumber) {
    //   winning scenariio
    updateMessage('🎉you guessed it correctly');
    updateBackground('green', 25);
    updateNum();
    updateHighScore();
  } else {
    //   wrong guess
    if (currentScore > 0) {
      currentScore--;
      updateScore();
      if (guess > secretNumber) {
        updateMessage('📈guess is too high');
      } else {
        updateMessage('📉guess is too low');
      }
    } else {
      // lost the game
      updateMessage('❌you lost the game');
      updateBackground('red');
    }
  }
});

// again button
const again = get('again');
again.addEventListener('click', () => {
  updateSecretNum();
  currentScore = 20;
  updateScore();
  updateBackground('grey', 15);
  updateMessage('start guessing...');
  updateNum('?');
  guessEl.value = '';
});
