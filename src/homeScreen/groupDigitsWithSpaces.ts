const narrowNoBreakSpace = "\u202F";
const usDigitGroupingSeparator = ",";

export const groupDigitsWithSpaces = (value: number) =>
  value
    .toLocaleString("en-US")
    .replaceAll(usDigitGroupingSeparator, narrowNoBreakSpace);
