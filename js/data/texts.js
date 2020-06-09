const text = {
  failure: {
    timeout: "You've not replied in the given challenge time.",
    hits: "You've reached the max number of tries.",
    advice: {
      hard: "Try the level medium and come back when you're ready!",
      medium:
        "Try the level easy and come back to this level when you're ready!",
    },
  },
  success: {
    advice: {
      easy: ' Try the level medium! 💪',
      medium: ' Try the level hard! 💪',
    },
  },
};

function createRulesHTML(mode) {
  const {
    difficulty,
    timeoutObjInMS,
    triesAllowedObj,
    isCountOfTries,
    isTimeout,
  } = mode;

  let timeoutText = isTimeout
    ? `<p>The timeout is set to <span class="u-highLightText">${timeoutObjInMS[difficulty]}</span> milliseconds,</p>`
    : '';
  let triesAllowedObjText = isCountOfTries
    ? `<p>You have <span class="u-highLightText">${triesAllowedObj[difficulty]}</span> tries allowed,</p>`
    : '';

  return `<div class="infoMode">The mode selected is the <span class="u-highLightText">${difficulty}</span> one.${timeoutText}${triesAllowedObjText} Good Luck!</div>`;
}

function createEndGameMessage({ detail }, { mode, ...params }) {
  const { cause, isVictory } = detail;
  const { difficulty } = mode;
  let winStatus = isVictory ? ' have won !! 🤘' : ' have lost 🙁';
  let reason = !isVictory ? text.failure[cause] : '';
  let advice = isVictory
    ? text.success.advice[difficulty]
    : text.failure.advice[difficulty];

  return `You${winStatus}</br>${reason}</br>${advice ? advice : ''}`;
}

export { createRulesHTML, createEndGameMessage };
