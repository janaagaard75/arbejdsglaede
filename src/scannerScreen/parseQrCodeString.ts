import { QrCode } from "../mainState/QrCode";

export const parseQrCodeString = (
  qrCodeString: string | undefined,
): QrCode | undefined => {
  if (qrCodeString === undefined) {
    return undefined;
  }

  if (/^[+-]flame$/.test(qrCodeString)) {
    const operation = qrCodeString[0];
    const value = (() => {
      switch (operation) {
        case "+":
          return 1;
        case "-":
          return -1;
        default:
          throw new Error(`The operation ${operation} is not supported.`);
      }
    })();

    return {
      amount: value,
      type: "flame",
    };
  }

  if (/^[+-]heart$/.test(qrCodeString)) {
    const operation = qrCodeString[0];
    const value = (() => {
      switch (operation) {
        case "+":
          return 1;
        case "-":
          return -1;
        default:
          throw new Error(`The operation ${operation} is not supported.`);
      }
    })();

    return {
      amount: value,
      type: "heart",
    };
  }

  if (/^[+-]\d{3}pp$/.test(qrCodeString)) {
    const operation = qrCodeString[0];
    const absolutePercentagePoints = parseInt(qrCodeString.slice(1, 4), 10);
    const percentagePoints = (() => {
      switch (operation) {
        case "+":
          return absolutePercentagePoints;
        case "-":
          return -absolutePercentagePoints;
        default:
          throw new Error(`The operation ${operation} is not supported.`);
      }
    })();

    return {
      amount: percentagePoints,
      type: "percentage",
    };
  }

  return undefined;
};
