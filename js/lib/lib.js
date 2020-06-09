import {
  gameBoardEl,
  gameFormEl,
  setTheBoard,
  colorInputsElRefObj,
  messageInputEls,
} from '../elements';

import { initTimeout, timeoutId, intervalId } from '../timeout';
import { initTriesRemaining } from '../countOfTries';

import { gameRBG, gameHSL, gameHEXA } from '../data/games.js';
import { modeTest } from '../data/modes.js';

import { handleSubmit, handleEndOfGame } from './handlers';

// TODO: add in lib file
let colorsRemainingToFind;
let game;

function startGame() {
  // TODO: START When the player has selected the game + its mode
  // prepareGame(gameRBG, modeTest);
  // prepareGame(gameHSL, modeTest);
  // prepareGame(gameHEXA, modeTest);
  console.log('init game');
  prepareGame(gameRBG, modeTest);
}

function displayMessage(message, color) {
  if (!color) console.log('display in a general element');
  let displayMessageEl = messageInputEls[`message-input-${color}`];
  displayMessageEl.textContent = message;
}

function colorFound(color) {
  colorInputsElRefObj[color].disabled = true;
  let updatedNamePropertiesToFind = colorsRemainingToFind.filter(
    (curr) => curr !== color
  );
  colorsRemainingToFind = updatedNamePropertiesToFind;
  if (!updatedNamePropertiesToFind.length) {
    // the game is finished, event endOfGame triggered
    gameBoardEl.dispatchEvent(
      new CustomEvent('endOfGame', {
        detail: {
          isVictory: true,
          timeoutID: timeoutId,
          intervalID: intervalId,
        },
      })
    );
    return;
  }
}

function evaluateAnswer(colorPlayer, colorToFind) {
  console.log({ colorPlayer, colorToFind });
  Object.keys(colorPlayer).forEach((color) => {
    let isTheSameColor = colorPlayer[color] === colorToFind[color];
    if (isTheSameColor) {
      // manage a color found
      displayMessage('✅', color);
      colorFound(color);
      return;
    } else if (colorPlayer[color] < colorToFind[color]) {
      displayMessage(`⬆️`, color);
    } else if (colorPlayer[color] > colorToFind[color]) {
      displayMessage(`⬇️`, color);
    } else {
      console.log(
        'something went wrong',
        colorPlayer[color],
        colorToFind[color]
      );
    }
  });
}

function gameLifeCycle({ isTimeout, isCountOfTries, difficulty, ...params }) {
  if (isTimeout) {
    // start timeout
    const { timeoutObjInMS } = params;
    let timeInMS = timeoutObjInMS[difficulty];
    initTimeout(timeInMS);
  }

  if (isCountOfTries) {
    const { triesAllowedObj } = params;
    // start to count tries
    initTriesRemaining(triesAllowedObj, difficulty);
  }

  gameFormEl.addEventListener('submit', handleSubmit);
  gameBoardEl.addEventListener('endOfGame', handleEndOfGame, { once: true });
}

function prepareGame(gameSelected, modeSelected) {
  game = {
    ...gameSelected,
    mode: { ...modeSelected },
  };
  // generate color
  game.colorToFind = game.generateColor();
  colorsRemainingToFind = game.namePropertiesToFind;
  // set the board
  setTheBoard(game);
  gameLifeCycle(game.mode);
}

export { startGame, game, evaluateAnswer };
