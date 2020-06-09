class Mode {
  constructor({ difficulty, isTimeout, isCountOfTries }) {
    this.difficulty = difficulty; // medium, hard,
    this.isTimeout = isTimeout;
    this.isCountOfTries = isCountOfTries;
    this.timeoutObjInMS = {
      easy: 210000,
      medium: 180000,
      hard: 150000,
    };
    this.triesAllowedObj = {
      easy: 50,
      medium: 30,
      hard: 15,
    };
  }
}

// TODO: Object completed during user choice
let options = {
  difficulty: 'easy',
  isTimeout: true,
  isCountOfTries: true,
};

let modeTest = new Mode(options);

export { modeTest };
