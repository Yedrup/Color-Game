import { generateRandom } from './utils';

export const gameRBG = {
  name: 'rgb',
  namePropertiesToFind: ['red', 'green', 'blue'],
  UI: {
    title: 'Find the background RBG color',
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
  generateColor: function () {
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
  formatColor: function ({ red, green, blue }) {
    return `rgb(${red},${green},${blue})`;
  },
};

// TODO: need to disable input for lightness and saturation depending mode
export const gameHSL = {
  name: 'hsl',
  namePropertiesToFind: ['hue', 'saturation', 'lightness'],
  UI: {
    title: 'Find the background in HSL',
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
  generateColor: function (mode = 'easy') {
    let isEasyMode = mode === 'easy';
    let hue = generateRandom(360);
    let saturation = isEasyMode ? 50 : generateRandom(100);
    let lightness = isEasyMode ? 50 : generateRandom(100);
    return {
      hue,
      saturation,
      lightness,
      string: `hsl(${hue},${saturation}%,${lightness}%)`,
    };
  },
  formatColor: function ({ hue, saturation, lightness }) {
    return `hsl(${hue},${saturation}%,${lightness}%)`;
  },
};

export const gameHEXA = {
  name: 'hexa',
  namePropertiesToFind: ['red', 'green', 'blue'],
  UI: {
    title: 'Find the background in Hexa',
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
  generateColor: function (mode = 'easy') {
    let isEasyMode = mode === 'easy';
    let hexa = generateRandom(16777215, 'hexa');
    let hexaInArray = hexa.split('');
    let red = hexaInArray.slice(0, 2).join('');
    let green = hexaInArray.slice(2, 4).join('');
    let blue = hexaInArray.slice(4, 6).join('');
    console.log({ hexaInArray, red, green, blue });
    return {
      red,
      green,
      blue,
      string: `#${hexa}`,
    };
  },
  formatColor: function ({ red, green, blue }) {
    return `#${red}${green}${blue}`;
  },
};
