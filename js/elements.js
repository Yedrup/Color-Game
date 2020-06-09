import { generateRandom, createRefElObject } from './utils';
import { createRulesHTML } from './data/texts.js';
import { colorIcon } from './utils';

const gameBoardEl = document.querySelector('.game-board');
const gameFormEl = document.createElement('form');
const gameFieldSetEl = document.createElement('fieldset');

let playerColorBlocEl;
let colorInputsElRefObj = {};
let messageInputEls = {};
let timeoutEl;
let tryCountEl;
let buttonSubmitEl;
let messageBoxEl;

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
      <span id="message-input-${name}" class="message-input-to-display"></span>
      </div>
      `;
    })
    .join('');
}

function setGameMessageBox() {
  let messageBox = `<div hidden class="messageBox" ></div>`;
  gameFormEl.insertAdjacentHTML('beforeend', messageBox);
  messageBoxEl = document.querySelector('.messageBox');
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
  colorInputsElRefObj = createRefElObject('input.input--color');
  messageInputEls = createRefElObject('.message-input-to-display', 'id');
}

function setModeEls({ isTimeout, isCountOfTries, ...additionalParams }) {
  if (isTimeout || isCountOfTries)
    buttonSubmitEl = document.querySelector('.button-submit');
  if (isTimeout) {
    timeoutEl = document.createElement('div');
    timeoutEl.classList.add('modeBox', 'modeBox--timeout');
    buttonSubmitEl.insertAdjacentElement('beforebegin', timeoutEl);
  }
  if (isCountOfTries) {
    tryCountEl = document.createElement('div');
    tryCountEl.classList.add('modeBox', 'modeBox--count');
    buttonSubmitEl.insertAdjacentElement('beforebegin', tryCountEl);
  }
}

function setPlayerColorBloc() {
  return `<div class="playerBlocColor"><span>color you've created</span></div>`;
}

function setTheBoard(game) {
  const { UI, mode } = game;
  const titleHTMl = `<h2 class="game__title">${UI.title}</h2>`;
  let playerColorBlocHTML = setPlayerColorBloc();
  gameBoardEl.innerHTML = titleHTMl + playerColorBlocHTML;
  playerColorBlocEl = document.querySelector('.playerBlocColor');
  setForm(game);
  setModeEls(mode);
  setGameMessageBox();
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
  messageInputEls,
  timeoutEl,
  tryCountEl,
  buttonSubmitEl,
  messageBoxEl,
};
