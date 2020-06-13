import Mode, { timeoutMode, hitsMode } from '../data/modes';
import gamesObj from '../data/games';
import {
  setSelectForm,
  formSelectEl,
  rulesElObj,
  hitsRuleEl,
  timeoutRuleEl,
  challengeSumUpEl,
} from './elements';

let optionsToComplete = {};
let optionsModeNames = ['hitsMode', 'timeoutMode'];

function formatOptions(input) {
  let isMode = input.name === 'isTimeout' || input.name === 'isCountOfTries';
  let isGameName = input.name === 'gameName';
  let formattedOption = isMode
    ? { [input.name]: input.checked }
    : isGameName
    ? { gameName: gamesObj[input.id].name }
    : { [input.name]: input.id };

  return {
    ...optionsToComplete,
    ...formattedOption,
  };
}

function waitUserChoice() {
  return new Promise((resolve, reject) => {
    formSelectEl.addEventListener('userHasChosen', ({ detail }) => {
      const { options } = detail;
      resolve({ options });
    });
  });
}

function askToSelectGame() {
  return new Promise(async function (resolve, reject) {
    // TODO: manage reject
    setSelectForm();
    optionsToComplete = initOptions();
    displayOptionsSelected();
    const { options } = await waitUserChoice();
    let mode = new Mode(options);
    // HACK: find a cleaner solution
    let gameNameFormatted = `game${options.gameName}`;
    let gameSelected = gamesObj[gameNameFormatted];
    resolve({ game: gameSelected, mode });
  });
}

function applyOpacity(elem, isTrue) {
  return isTrue ? (elem.style.opacity = 1) : (elem.style.opacity = 0.1);
}

function manageChallengeDisplay({ isTimeout, isCountOfTries }) {
  let fieldSetDifficulty = formSelectEl.children.difficulty;

  let isAnyChallenge = !!(isTimeout || isCountOfTries);
  if (!isAnyChallenge) {
    challengeSumUpEl.style.opacity = 0.1;
    fieldSetDifficulty.style.opacity = 0.1;
    fieldSetDifficulty.disabled = true;
    return;
  }
  let challengeTitle = document.querySelector('#challenge-title');
  challengeTitle.style.opacity = 1;
  challengeSumUpEl.style.opacity = 1;
  fieldSetDifficulty.style.opacity = 1;
  fieldSetDifficulty.disabled = false;
  applyOpacity(timeoutRuleEl, isTimeout);
  applyOpacity(hitsRuleEl, isCountOfTries);
}

function displayOptionsSelected() {
  const { isTimeout, isCountOfTries, ...inputsForDisplay } = optionsToComplete;
  manageChallengeDisplay({ isTimeout, isCountOfTries });
  Object.keys(inputsForDisplay).forEach(displayOption);
}

function displayOption(nameOption) {
  let isMode = optionsModeNames.includes(nameOption);
  let elemDisplay = rulesElObj[nameOption];
  let option = optionsToComplete[nameOption];

  if (!elemDisplay) return;
  if (isMode) {
    const { difficulty } = optionsToComplete;
    elemDisplay.textContent = option[difficulty];
    return;
  }
  elemDisplay.innerHTML = `<span>${option}</span>`;
}

function filterEl(elem) {
  let isInputChallenge = elem.type === 'checkbox';
  return elem.tagName === 'INPUT' && (elem.checked || isInputChallenge);
}

function initOptions() {
  let options = Array.from(formSelectEl.elements)
    .filter(filterEl)
    .map(formatOptions)
    .reduce((accObj, item) => {
      return { ...accObj, ...item };
    }, {});
  return { ...options, timeoutMode, hitsMode };
}

function updateOptions(e) {
  let inputEl = e.target;
  optionsToComplete = formatOptions(inputEl);
}

export {
  optionsToComplete,
  updateOptions,
  askToSelectGame,
  displayOptionsSelected,
};
