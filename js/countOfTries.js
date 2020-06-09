import { tryCountEl, gameBoardEl } from './elements';

let triesLeft;

function displayTriesRemaining(triesRemaining) {
  let displayHTML = `<span class="modeBox__icon">🎯</span><span class="u-highLightText">${triesRemaining}</span>`;
  tryCountEl.innerHTML = displayHTML;
}

function updateTriesRemaining() {
  triesLeft -= 1;
  displayTriesRemaining(triesLeft);
  if (triesLeft === 0) {
    // trigger end endOfGame event
    gameBoardEl.dispatchEvent(
      new CustomEvent('endOfGame', {
        detail: {
          isVictory: false,
          cause: 'hits',
        },
      })
    );
    return;
  }
}

function initTriesRemaining(triesAllowedObj, difficulty) {
  let triesAllowed = triesAllowedObj[difficulty];
  triesLeft = triesAllowed;
  displayTriesRemaining(triesLeft);
}

export { initTriesRemaining, updateTriesRemaining };
