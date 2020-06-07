// value to get the hexa https://css-tricks.com/snippets/javascript/random-hex-color/
const VALUE_TO_GET_HEXA = 16777215;
const RADIX_HEXA = 16;
const RGB_MAX_NUMBER = 255;
export const generateRandom = (numMax = RGB_MAX_NUMBER, isHexa = '') => {
  if (isHexa === 'hexa') {
    let hexa = Math.floor(Math.random() * VALUE_TO_GET_HEXA).toString(
      RADIX_HEXA
    );
    return hexa.toLowerCase();
  }
  return Math.floor((numMax + 1) * Math.random());
};

export const colorIcon = {
  red: '🔴',
  green: '🟢',
  blue: '🔵',
  hue: '🎨',
  saturation: '☯︎',
  lightness: '🔅',
};

export function createRefElObject(
  selectorToSearch,
  attributeToUseAsProp = 'name'
) {
  return Array.from(document.querySelectorAll(selectorToSearch)).reduce(
    (acc, curr) => {
      acc[curr[attributeToUseAsProp]] = curr;
      return acc;
    },
    {}
  );
}
