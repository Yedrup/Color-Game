class Mode {
  constructor({ difficulty, isTimeout, isCountOfTries }) {
    this.difficulty = difficulty; // medium, hard,
    this.isTimeout = isTimeout;
    this.isCountOfTries = isCountOfTries;
    this.timeoutObjInMS = {
      easy: 210000,
      medium: 210000,
      hard: 120000,
    };
    this.triesAllowed = {
      easy: 50,
      medium: 30,
      hard: 15,
    };
  }
}

function createRulesHTML(mode) {
  const {
    difficulty,
    timeoutObjInMS,
    triesAllowed,
    isCountOfTries,
    isTimeout,
  } = mode;

  let timeoutText = isTimeout
    ? `<p>The timeout is set to <span class="u-highLightText">${timeoutObjInMS[difficulty]}</span> milliseconds,</p>`
    : '';
  let triesAllowedText = isCountOfTries
    ? `<p>You have <span class="u-highLightText">${triesAllowed[difficulty]}</span> tries allowed,</p>`
    : '';

  return `<div class="infoMode">The mode selected is the <span class="u-highLightText">${difficulty}</span> one.${timeoutText}${triesAllowedText} Good Luck!</div>`;
}

// TODO: Object completed during user choice
let options = {
  difficulty: 'easy',
  isTimeout: true,
  isCountOfTries: false,
};

let modeTest = new Mode(options);

export { modeTest, createRulesHTML };
