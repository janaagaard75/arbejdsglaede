import { QrCode } from "../mainState/QrCode";

const flameCode = /^[+-]flame$/;
const heartCode = /^[+-]heart$/;
const percentagePointsCode = /^[+-]\d{3}pp$/;

export const parseQrCodeString = (
  qrCodeString: string | undefined,
): QrCode | undefined => {
  if (qrCodeString === undefined) {
    return undefined;
  }

  if (flameCode.test(qrCodeString)) {
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

  if (heartCode.test(qrCodeString)) {
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

  if (percentagePointsCode.test(qrCodeString)) {
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
