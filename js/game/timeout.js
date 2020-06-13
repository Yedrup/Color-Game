import { timeoutEl, gameBoardEl } from '../game/elements';
import { formatTimeout, MS_IN_1_SEC } from '../utils';

let timeoutId, intervalId;

function displayTimeRemaining(timeRemainingInMS) {
  timeoutEl.innerHTML = formatTimeout(timeRemainingInMS);
}

// Function from Wes Bos JS course
function setImmediateInterval(funcToRun, ms) {
  // right away call that function
  funcToRun();
  // return the id of the setInterval
  return setInterval(funcToRun, ms);
}

function initTimeout(timeInMS) {
  timeoutId = setTimeout(() => {
    clearInterval(intervalId);
    // trigger endOfGame event cause the time is out
    gameBoardEl.dispatchEvent(
      new CustomEvent('endOfGame', {
        detail: {
          isVictory: false,
          cause: 'timeout',
          timeoutID: timeoutId,
          intervalID: intervalId,
        },
      })
    );
  }, timeInMS);
  intervalId = setImmediateInterval(
    () => displayTimeRemaining((timeInMS -= MS_IN_1_SEC)),
    MS_IN_1_SEC
  );
}

export { initTimeout, timeoutId, intervalId };
