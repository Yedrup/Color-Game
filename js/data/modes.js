import { formatTimeout } from '../utils';

function formatModeTimeoutObj(modeObject) {
  return Object.entries(modeObject).reduce((acc, [mode, timeInMs]) => {
    acc[mode] = `${formatTimeout(timeInMs)}`;
    return acc;
  }, {});
}

export const timeoutModeInMS = {
  easy: 120000,
  medium: 90000,
  hard: 60000,
};

export const hitsMode = {
  easy: 30,
  medium: 20,
  hard: 10,
};
let formattedTimeoutObj = formatModeTimeoutObj(timeoutModeInMS);
export const timeoutMode = formattedTimeoutObj;

class Mode {
  constructor({
    difficulty = 'easy',
    isTimeout = false,
    isCountOfTries = false,
  }) {
    this.difficulty = difficulty; // medium, hard,
    this.isTimeout = isTimeout;
    this.isCountOfTries = isCountOfTries;
    this.timeoutObjInMS = { ...timeoutModeInMS };
    this.triesAllowedObj = { ...hitsMode };
  }
}

export default Mode;
