// TODO: Better creation with data in objects

const formSelectTpl = `<form class='select-game-form js-select-game-form'>
</form>`;

const fieldSetSelectColor = `
<fieldset class='select-game__fieldset radio-toolbar' name='field-game-choice'>
  <legend class='select-game__section__title'>🎨 Color Code</legend>

  <input type='radio' id='gameRGB' name='gameName' value='RGB' checked>
  <label for='gameRGB'>RGB</label>

  <input type='radio' id='gameHEX' name='gameName' value='HEX'>
  <label for='gameHEX'>HEX</label>

  <input type='radio' id='gameHSL' name='gameName' value='HSL'>
  <label for='gameHSL'>HSL</label>
</fieldset>
`;

const fieldSetSelectChallenge = `
<fieldset class='select-game__fieldset'>
<legend class='select-game__section__title'>🤯 Challenge(s)?</legend>
<div class='checkboxes--challenges'>
    <div>
        <input type='checkbox' name='isTimeout' id='timeout'>
        <label for='timeout'>⏱ Time Limited </label>
    </div>
    <div>
        <input type='checkbox' name='isCountOfTries' id='hits'>
        <label for='hits'>🎯 Tries Limited </label>
    </div>
</div>
</fieldset>
`;

const fieldSetSelectDifficulty = `
<fieldset class='select-game__fieldset radio-toolbar' id='difficulty'>
  <legend class='select-game__section__title'>💪 Difficulty</legend>
  <input type='radio' name='difficulty' id='easy' value='Easy' checked>
  <label for='easy'>Easy</label>
  <input type='radio' name='difficulty' id='medium' value='Medium'>
  <label for='medium'>Medium</label>
  <input type='radio' name='difficulty' id='hard' value='Hard'>
  <label for='hard'>Hard</label>
</fieldset>
`;

const fieldSetSumUp = `
<fieldset class='select-game__fieldset js-rules' id='js-rules'>
    <legend class='select-game__section__title'>📏 Rules Applied: </legend>
    <div class='rules'>
        <p>
            Find the
            <span class='u-highLightText--selected js-option-values' id='gameName'></span>
            code of a random color.
        </p>
        <div class='rules__section--challenge js-challenge-sum-up'>
            <p class='select-game__section__subtitle' id='challenge-title'>Challenges selected:</p>
            <p id='rule-difficulty'>
                Difficulty <span class='u-highLightText--selected js-option-values' id='difficulty'></span>
            </p>
            <p id='rule-hits'>
                You have only <span class='u-highLightText--selected js-option-values' id='hitsMode'>
                </span>tries allowed.
            </p>
            <p id='rule-timeout'>
                Oh, and you have
                <span class='u-highLightText--selected js-option-values' id='timeoutMode'></span> to succeed 😉
            </p>
        </div>
        <p>🍀 Good luck!</p>
    </div>
</fieldset>
`;

const submitButtonTpl = `
  <div class='parent-button--start-game'>
    <input type='submit' class='button--start-game js-button--start-game' value="Let' s GO!">
  </div>
`;

const fieldSetsTpl = [
  fieldSetSelectColor,
  fieldSetSelectChallenge,
  fieldSetSelectDifficulty,
  fieldSetSumUp,
];

export { fieldSetsTpl, formSelectTpl, submitButtonTpl };
