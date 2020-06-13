import { formSelectEl } from './elements';
import {
  optionsToComplete,
  updateOptions,
  displayOptionsSelected,
} from './lib';

function handleSubmitGameOptions(e) {
  e.preventDefault();
  const { hitsMode, timeoutMode, ...objectPrepared } = optionsToComplete;
  formSelectEl.dispatchEvent(
    new CustomEvent('userHasChosen', { detail: { options: objectPrepared } })
  );
}

function handleChangedOptions() {
  displayOptionsSelected();
}

function handleInputs(e) {
  updateOptions(e);
}

export { handleSubmitGameOptions, handleChangedOptions, handleInputs };
