import { generateRandom } from '../utils';
const gameRGB = {
  name: 'RGB',
  url: 'https://www.w3schools.com/colors/colors_rgb.asp',
  namePropertiesToFind: ['red', 'green', 'blue'],
  UI: {
    title:
      'Find the background color of left block <span class="u-highLightText">RGB</span> color',
    inputs: [
      {
        name: 'red',
        maxValue: 255,
        valueType: 'number',
      },
      {
        name: 'green',
        maxValue: 255,
        valueType: 'number',
      },
      {
        name: 'blue',
        maxValue: 255,
        valueType: 'number',
      },
    ],
  },
  generateColor() {
    let red = generateRandom();
    let green = generateRandom();
    let blue = generateRandom();
    return {
      red,
      green,
      blue,
      string: `rgb(${red},${green},${blue})`,
    };
  },
  formatColor({ red, green, blue }) {
    return `rgb(${red},${green},${blue})`;
  },
};

// TODO: need to disable input for lightness and saturation depending mode
const gameHSL = {
  name: 'HSL',
  url: 'https://www.w3schools.com/colors/colors_hsl.asp',
  namePropertiesToFind: ['hue', 'saturation', 'lightness'],
  UI: {
    title:
      'Find the background color of left block in <span class="u-highLightText">HSL</span>',
    inputs: [
      {
        name: 'hue',
        maxValue: 360,
        valueType: 'number',
      },
      {
        name: 'saturation',
        maxValue: 100,
        unit: '%',
        valueType: 'number',
      },
      {
        name: 'lightness',
        maxValue: 100,
        unit: '%',
        valueType: 'number',
      },
    ],
  },
  generateColor(difficulty = 'easy') {
    let isEasyDifficulty = difficulty === 'easy';
    let hue = generateRandom({ numMax: 360 });
    let saturation = isEasyDifficulty ? 50 : generateRandom({ numMax: 100 });
    let lightness = isEasyDifficulty ? 50 : generateRandom({ numMax: 100 });
    return {
      hue,
      saturation,
      lightness,
      string: `hsl(${hue},${saturation}%,${lightness}%)`,
    };
  },
  formatColor({ hue, saturation, lightness }) {
    return `hsl(${hue},${saturation}%,${lightness}%)`;
  },
};

const gameHEX = {
  name: 'HEX',
  url: 'https://www.w3schools.com/colors/colors_hexadecimal.asp',
  namePropertiesToFind: ['red', 'green', 'blue'],
  UI: {
    title:
      'Find the background color of the left block in <span class="u-highLightText">HEX</span> ',
    inputs: [
      {
        name: 'red',
        pattern: '[A-F0-9]{10}',
        maxValue: 'FF',
        valueType: 'text',
      },
      {
        name: 'green',
        maxValue: 'FF',
        pattern: '[A-F0-9]{10}',
        valueType: 'text',
      },
      {
        name: 'blue',
        maxValue: 'FF',
        pattern: '[A-F0-9]{10}',
        valueType: 'text',
      },
    ],
  },
  generateColor(mode = 'easy') {
    let hex = generateRandom({ isHex: true });
    let hexInArray = hex.split('');
    let red = hexInArray.slice(0, 2).join('');
    let green = hexInArray.slice(2, 4).join('');
    let blue = hexInArray.slice(4, 6).join('');
    return {
      red,
      green,
      blue,
      string: `#${hex}`,
    };
  },
  formatColor({ red, green, blue }) {
    return `#${red}${green}${blue}`;
  },
};

const gamesObj = { gameRGB, gameHSL, gameHEX };

export default gamesObj;
