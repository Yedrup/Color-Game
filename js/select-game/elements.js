import {
  handleSubmitGameOptions,
  handleInputs,
  handleChangedOptions,
} from './handlers';
import { createRefElObject } from '../utils';
import { fieldSetsTpl, formSelectTpl, submitButtonTpl } from './templates';

const selectGamePanel = document.querySelector('.js-select-game-panel');

let formSelectEl;
let buttonStartEl;
let rulesEl;
let challengeSumUpEl;
let timeoutRuleEl;
let hitsRuleEl;
let rulesElObj;

function createForm() {
  // create form
  selectGamePanel.insertAdjacentHTML('afterbegin', formSelectTpl);
  formSelectEl = selectGamePanel.querySelector('.js-select-game-form');
  // create fieldSet and submit button
  fieldSetsTpl.forEach((fieldSetTpl) => {
    formSelectEl.insertAdjacentHTML('beforeend', fieldSetTpl);
  });
  formSelectEl.insertAdjacentHTML('beforeend', submitButtonTpl);
}

function createRefs() {
  // create all element refs
  rulesEl = formSelectEl.querySelector('.js-rules');
  challengeSumUpEl = rulesEl.querySelector('.js-challenge-sum-up');
  timeoutRuleEl = rulesEl.querySelector('#rule-timeout');
  hitsRuleEl = rulesEl.querySelector('#rule-hits');
  buttonStartEl = document.querySelector('.js-button--start-game');
  // create rules
  rulesElObj = createRefElObject('.js-option-values', 'id');
}

function setSelectForm() {
  // create form
  createForm();
  // create the elements references
  createRefs();
  // add listeners
  formSelectEl.addEventListener('input', handleInputs);
  formSelectEl.addEventListener('submit', handleSubmitGameOptions);
  formSelectEl.addEventListener('change', handleChangedOptions);
}

export {
  buttonStartEl,
  formSelectEl,
  setSelectForm,
  rulesElObj,
  rulesEl,
  timeoutRuleEl,
  hitsRuleEl,
  challengeSumUpEl,
};
