// The board game palette, sampled from the swatches in Figma/04_Farver/farvepalette.pdf. The palette's red is left out, because red means a low battery or a lost heart in this app.
const cream = "#f8f4ee";
const ink = "#292929";

// The palette's grey ramp jumps straight from #c6c6c6 to #292929, so these two steps are mixed from that gap. They swap roles between the themes: the lighter one is muted text on ink and disabled text on cream, and the darker one the other way around.
const greyLight = "#a8a8a8";
const greyDark = "#6e6e6e";

// The battery, flame and heart colors carry meaning in the game and stay on the Tailwind palette. Tailwind v4 only exposes the palette as oklch() strings, which React Native and react-native-svg cannot parse, so the values are written out here.
const amber500 = "#f59e0b";
const green600 = "#16a34a";
const red500 = "#ef4444";
const red600 = "#dc2626";

export const colors = {
  dark: {
    background: ink,
    disabledText: greyDark,
    green: green600,
    mutedText: greyLight,
    orange: amber500,
    // The lighter red-500 reaches 3.9:1 against the ink background, where red-600 only manages 3.0:1.
    red: red500,
    text: cream,
    unselected: greyDark,
  },
  light: {
    background: cream,
    disabledText: greyLight,
    green: green600,
    mutedText: greyDark,
    orange: amber500,
    red: red600,
    text: ink,
    unselected: greyLight,
  },
};
