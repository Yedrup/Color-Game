import { colorIcon } from '../utils';

function generateInputsHTML(inputsArray) {
  return inputsArray
    .map(({ name, maxValue, valueType, pattern = null }) => {
      return `
      <div class="input__parent input__parent--${name}">
        <label name=${name}>${colorIcon[name]} ${name}</label>
        <input class="input--color input--color--${name}" ${
        pattern ? (pattern = pattern) : ''
      } type=${valueType} name=${name}
      value=''
      required max=${maxValue}/>
      <span id="message-input-${name}" class="message-input-to-display"></span>
      </div>
      `;
    })
    .join('');
}

function generateColorBlocksHTML() {
  return `
  <div class="colorBlocs">
    <div class="blocColor blocColor--find js-blocColor-find findBlocColor">
      <span>color to find</span>
    </div>
    <div class="blocColor blocColor--player  js-blocColor-player playerBlocColor">
      <span>your color</span>
    </div>
  </div>`;
}

export { generateInputsHTML, generateColorBlocksHTML };
