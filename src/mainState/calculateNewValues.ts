import { KnownQrCode } from "./KnownQrCode";
import { maximumIcons } from "./maximumIcons";

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(maximum, Math.max(minimum, value));

const percentagePointsPerSmiley = 100;

export const calculateNewValues = (
  currentValues: {
    hearts: number;
    percentage: number;
    smileys: number;
  },
  qrCode: KnownQrCode,
) => {
  switch (qrCode.type) {
    case "heart":
      return {
        newHearts: clamp(currentValues.hearts + qrCode.amount, 0, maximumIcons),
        newPercentage: currentValues.percentage,
        newSmileys: currentValues.smileys,
      };

    case "percentage": {
      const maximumPercentagePoints =
        maximumIcons * percentagePointsPerSmiley + percentagePointsPerSmiley;
      const currentPercentagePoints =
        currentValues.smileys * percentagePointsPerSmiley
        + currentValues.percentage;
      const newPercentagePoints = clamp(
        currentPercentagePoints + qrCode.amount,
        0,
        maximumPercentagePoints,
      );
      const newSmileys = Math.min(
        maximumIcons,
        Math.floor(newPercentagePoints / percentagePointsPerSmiley),
      );
      const newPercentage =
        newPercentagePoints - newSmileys * percentagePointsPerSmiley;

      return {
        newHearts: currentValues.hearts,
        newPercentage: newPercentage,
        newSmileys: newSmileys,
      };
    }

    case "smiley":
      return {
        newHearts: currentValues.hearts,
        newPercentage: currentValues.percentage,
        newSmileys: clamp(
          currentValues.smileys + qrCode.amount,
          0,
          maximumIcons,
        ),
      };
  }
};
