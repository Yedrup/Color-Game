import { generateRandom, createRefElObject } from './utils';
import { createRulesHTML } from './modes';
import { colorIcon, formatTimeout, MS_IN_1_SEC } from './utils';

const gameBoardEl = document.querySelector('.game-board');
const gameFormEl = document.createElement('form');
const gameFieldSetEl = document.createElement('fieldset');

let playerColorBlocEl;
let colorInputsElRefObj = {};
let messageDisplayEls = {};
let timeoutEl;
let tryCountEl;
let buttonSubmitEl;
let timeIntervalTimeoutIds;

function generateInputsHTML(inputsArray) {
  return inputsArray
    .map(({ name, maxValue, valueType, pattern = null }) => {
      return `
      <div class="input__parent input__parent--${name}">
        <label name=${name}>${colorIcon[name]} ${name}</label>
        <input class="input--color input--color--${name}" ${
        pattern ? (pattern = pattern) : ''
      } type=${valueType} name=${name} value=${generateRandom(
        255
      )} required max=${maxValue}/>
      <span id="message-el-${name}" class="message-input-to-display"></span>
      </div>
      `;
    })
    .join('');
}

function setForm({ name, UI, colorToFind }) {
  gameBoardEl.insertAdjacentElement('beforeend', gameFormEl);
  gameFormEl.classList.add(`game-form`, `game-form--${name}`);
  gameFormEl.setAttribute('autocomplete', 'off');
  gameFormEl.insertAdjacentElement('afterbegin', gameFieldSetEl);

  const inputsToCreate = generateInputsHTML(UI.inputs);
  const validateInput = `<input class="button-submit" value=submit type="submit"/>`;
  document.body.style.background = colorToFind.string;

  const allHTML = inputsToCreate + validateInput;
  gameFieldSetEl.innerHTML = allHTML;

  // create objects of refs for input and message
  let colorInputsElRefObjCreated = createRefElObject('input.input--color');
  let messageDisplayElsCreated = createRefElObject(
    '.message-input-to-display',
    'id'
  );

  return { colorInputsElRefObjCreated, messageDisplayElsCreated };
}

function displayTimeRemaining(timeRemainingInMS) {
  timeoutEl.innerHTML = formatTimeout(timeRemainingInMS);
  timeRemainingInMS -= MS_IN_1_SEC;
}

// TODO: Time management in its own file.
function setImmediateInterval(funcToRun, ms) {
  // From Wes Bos JS course
  // right away call that function
  funcToRun();
  // return the id of the setInterval
  return setInterval(funcToRun, ms);
}

function setTimeoutTest(timeInMS) {
  let timeoutId = setTimeout(() => {
    clearInterval(intervalId);
  }, timeInMS);
  let intervalId = setImmediateInterval(
    () => displayTimeRemaining((timeInMS -= MS_IN_1_SEC)),
    MS_IN_1_SEC
  );
  return { timeoutId, intervalId };
}

function setModeEls(mode) {
  const { isTimeout, isCountOfTries, difficulty } = mode;
  if (isTimeout || isCountOfTries)
    buttonSubmitEl = document.querySelector('.button-submit');
  if (isTimeout) {
    const { timeoutObjInMS } = mode;
    let timeoutInMS = timeoutObjInMS[difficulty];
    timeoutEl = document.createElement('div');
    timeoutEl.classList.add('modeBox', 'modeBox--timeout');
    buttonSubmitEl.insertAdjacentElement('beforebegin', timeoutEl);
    timeIntervalTimeoutIds = setTimeoutTest(timeoutInMS);
  }
  if (isCountOfTries) {
    tryCountEl = document.createElement('div');
    tryCountEl.classList.add('modeBox', 'modeBox--count');
    buttonSubmitEl.insertAdjacentElement('beforebegin', tryCountEl);
    // TODO: hit management  + in its own file
    tryCountEl.innerHTML =
      '<span class="modebox__icon">🎯</span><span class="u-highLightText">5</span> ';
  }

  // This text will be in the player chose time
  // const modeInfoEl = document.createElement('div');
  // modeInfoEl.classList.add('modeInfo');
  // const rulesHTML = createRulesHTML(mode);
  // modeInfoEl.innerHTML = rulesHTML;
  // playerColorBlocEl.insertAdjacentElement('beforebegin', modeInfoEl);
  console.log({ isTimeout, isCountOfTries });
}

function setTheBoard(game) {
  const { UI, mode } = game;
  const titleHTMl = `<h2 class="game__title">${UI.title}</h2>`;
  const playerColorBloc = `<div class="bloc-player-color"><span>color you've created</span></div>`;

  gameBoardEl.innerHTML = titleHTMl + playerColorBloc;
  playerColorBlocEl = document.querySelector('.bloc-player-color');
  const { colorInputsElRefObjCreated, messageDisplayElsCreated } = setForm(
    game
  );
  setModeEls(mode);
  colorInputsElRefObj = colorInputsElRefObjCreated;
  messageDisplayEls = messageDisplayElsCreated;
  gameBoardEl.hidden = false;
}

export {
  gameBoardEl,
  gameFormEl,
  gameFieldSetEl,
  generateInputsHTML,
  setForm,
  setTheBoard,
  playerColorBlocEl,
  colorInputsElRefObj,
  messageDisplayEls,
  timeoutEl,
  tryCountEl,
  buttonSubmitEl,
  setTimeoutTest,
  timeIntervalTimeoutIds,
};
