import { createRefElObject } from '../utils';
import { formSelectEl } from '../select-game/elements';
import { handleInputFocus } from './handlers';
import { generateInputsHTML, generateColorBlocksHTML } from './templates';
const gameBoardEl = document.querySelector('.js-game-board');

const gameFormEl = document.createElement('form');
const gameFieldSetEl = document.createElement('fieldset');

let findColorBlocEl;
let playerColorBlocEl;
let colorInputsElRefObj = {};
let messageInputEls = {};
let timeoutEl;
let tryCountEl;
let buttonSubmitEl;
let messageBoxEl;

function setGameMessageBox() {
  let messageBox = `<div hidden class="messageBox" ></div>`;
  gameFormEl.insertAdjacentHTML('beforeend', messageBox);
  messageBoxEl = document.querySelector('.messageBox');
}

function setForm({ name, UI, colorToFind }) {
  gameBoardEl.insertAdjacentElement('beforeend', gameFormEl);
  gameFormEl.setAttribute('autocomplete', 'off');
  gameFormEl.classList.add(`game-form`, `game-form--${name}`);
  gameFormEl.insertAdjacentElement('afterbegin', gameFieldSetEl);
  gameFieldSetEl.classList.add('game-fieldset');

  const inputsToCreate = generateInputsHTML(UI.inputs);
  const validateInput = `<input class="button-submit" value=submit type="submit"/>`;

  findColorBlocEl.style.background = colorToFind.string;

  const allHTML = inputsToCreate + validateInput;
  gameFieldSetEl.innerHTML = allHTML;
  buttonSubmitEl = document.querySelector('.button-submit');

  // create objects of refs for input and message
  colorInputsElRefObj = createRefElObject('input.input--color');
  messageInputEls = createRefElObject('.message-input-to-display', 'id');

  gameFormEl.addEventListener('focusin', handleInputFocus);
}

function setModeEls({ isTimeout, isCountOfTries, ...additionalParams }) {
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

function setTheBoard(game) {
  const { UI, mode } = game;
  const titleHTMl = `<h2 class="game__title">${UI.title}</h2>`;
  let blocsColorBlocHTML = generateColorBlocksHTML();
  gameBoardEl.innerHTML = titleHTMl + blocsColorBlocHTML;
  playerColorBlocEl = document.querySelector('.js-blocColor-player');
  findColorBlocEl = document.querySelector('.js-blocColor-find');
  setForm(game);
  setModeEls(mode);
  setGameMessageBox();
  formSelectEl ? (formSelectEl.hidden = true) : null;
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
  findColorBlocEl,
};
