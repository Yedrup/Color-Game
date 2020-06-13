// value to get the hex https://css-tricks.com/snippets/javascript/random-hex-color/
const VALUE_TO_GET_HEX = 16777215;
const RADIX_HEX = 16;
const RGB_MAX_NUMBER = 255;

const MS_IN_1_MIN = 60000;
const MS_IN_1_SEC = 1000;
const SEC_IN_1_MIN = 60;

// COLORS
const generateRandom = ({ isHex = false, numMax = RGB_MAX_NUMBER } = {}) => {
  if (isHex) {
    let hex = Math.floor(Math.random() * VALUE_TO_GET_HEX).toString(RADIX_HEX);
    return hex.toLowerCase();
  }
  return Math.floor((numMax + 1) * Math.random());
};

const colorIcon = {
  red: '🔴',
  green: '🟢',
  blue: '🔵',
  hue: '🎨',
  saturation: '☯︎',
  lightness: '🔅',
};

function createRefElObject(selectorToSearch, attributeToUseAsProp = 'name') {
  return Array.from(document.querySelectorAll(selectorToSearch)).reduce(
    (acc, curr) => {
      acc[curr[attributeToUseAsProp]] = curr;
      return acc;
    },
    {}
  );
}

// TIME

const formatTimeout = (timeInMS) => {
  let timeInSecondes = Math.floor(timeInMS / MS_IN_1_SEC).toFixed();
  let timeInMinutes = Math.floor(timeInSecondes / SEC_IN_1_MIN).toFixed();

  let s = timeInSecondes % SEC_IN_1_MIN;
  let m = timeInMinutes % SEC_IN_1_MIN;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

export {
  formatTimeout,
  createRefElObject,
  colorIcon,
  generateRandom,
  MS_IN_1_MIN,
  MS_IN_1_SEC,
  SEC_IN_1_MIN,
};
