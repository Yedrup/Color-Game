import { generateRandom } from './utils';

export const gameRBG = {
  name: 'rgb',
  nameProperties: ['red', 'green', 'blue'],
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
    let red = generateRandom(255);
    let green = generateRandom(255);
    let blue = generateRandom(255);
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
  nameProperties: ['hue', 'saturation', 'lightness'],
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
