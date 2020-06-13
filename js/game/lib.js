import {
  gameBoardEl,
  gameFormEl,
  setTheBoard,
  colorInputsElRefObj,
  messageInputEls,
} from '../game/elements';
import { initTimeout, timeoutId, intervalId } from './timeout';
import { initTriesRemaining } from './countOfTries';
import { handleSubmit, handleEndOfGame } from './handlers';

let colorsRemainingToFind;
let game;

function startGame(gameName, mode) {
  prepareGame(gameName, mode);
}

function displayMessage(message, color) {
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
  Object.keys(colorPlayer).forEach((color) => {
    let isTheSameColor = colorPlayer[color] === colorToFind[color];
    if (isTheSameColor) {
      // manage a color found
      displayMessage('✅', color);
      colorFound(color);
      return;
    } else if (colorPlayer[color] < colorToFind[color]) {
      displayMessage(`need ⬆️`, color);
    } else if (colorPlayer[color] > colorToFind[color]) {
      displayMessage(`need ⬇️`, color);
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
  const { difficulty } = modeSelected;
  game.colorToFind = game.generateColor(difficulty);
  colorsRemainingToFind = game.namePropertiesToFind;
  // set the board
  setTheBoard(game);
  gameLifeCycle(game.mode);
}

export { startGame, game, evaluateAnswer };
