import { KnownQrCode } from "../mainState/KnownQrCode";

export const parseQrCodeString = (
  qrCodeString: string,
): "unknownQrCode" | KnownQrCode => {
  switch (qrCodeString) {
    case "-050pp":
      return { amount: -50, type: "percentage" };
    case "-030pp":
      return { amount: -30, type: "percentage" };
    case "-020pp":
      return { amount: -20, type: "percentage" };
    case "-010pp":
      return { amount: -10, type: "percentage" };
    case "+010pp":
      return { amount: 10, type: "percentage" };
    case "+020pp":
      return { amount: 20, type: "percentage" };
    case "+030pp":
      return { amount: 30, type: "percentage" };
    case "+050pp":
      return { amount: 50, type: "percentage" };
    case "+smiley":
      return { amount: 1, type: "smiley" };
    case "-heart":
      return { amount: -1, type: "heart" };
    default:
      return "unknownQrCode";
  }
};
