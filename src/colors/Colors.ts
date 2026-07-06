// Hex values from the Tailwind color palette. Tailwind v4 only exposes the palette as oklch() strings, which React Native and react-native-svg cannot parse, so the values are written out here.
const amber500 = "#f59e0b";
const green600 = "#16a34a";
const red600 = "#dc2626";
const zinc100 = "#f4f4f5";
const zinc200 = "#e4e4e7";
const zinc400 = "#a1a1aa";
const zinc500 = "#71717a";
const zinc600 = "#52525b";
const zinc800 = "#27272a";
const zinc900 = "#18181b";

export const Colors = {
  dark: {
    background: zinc900,
    disabledText: zinc500,
    green: green600,
    orange: amber500,
    red: red600,
    text: zinc200,
    unselected: zinc600,
  },
  light: {
    background: zinc100,
    disabledText: zinc400,
    green: green600,
    orange: amber500,
    red: red600,
    text: zinc800,
    unselected: zinc400,
  },
};
