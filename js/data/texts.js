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

function createEndGameMessage({ detail }, { mode, ...params }) {
  const { cause, isVictory } = detail;
  const { difficulty } = mode;
  let winStatus = isVictory ? ' have won !! 🤘' : ' have lost 🙁';
  let reason = !isVictory ? text.failure[cause] : '';
  let isAChallenge = !!(mode.isTimeout || mode.isCountOfTries);
  let advice;
  if (isAChallenge) {
    advice = isVictory
      ? text.success.advice[difficulty]
      : text.failure.advice[difficulty];
  } else {
    advice =
      'Try to challenge yourself adding limited time or hits or... BOTH! 💪';
  }

  return `You${winStatus}</br>${reason}</br>${advice ? advice : ''}`;
}

export { createEndGameMessage };
