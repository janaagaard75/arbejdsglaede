import { clamp } from "react-native-reanimated";
import { KnownQrCode } from "./KnownQrCode";
import { maximumIcons } from "./maximumIcons";

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
      const unrestrictedNewPercentage = clamp(
        currentValues.percentage + qrCode.amount,
        0,
        Number.MAX_SAFE_INTEGER,
      );

      if (unrestrictedNewPercentage <= 100) {
        return {
          newHearts: currentValues.hearts,
          newPercentage: unrestrictedNewPercentage,
          newSmileys: currentValues.smileys,
        };
      }

      if (currentValues.smileys === maximumIcons) {
        return {
          newHearts: currentValues.hearts,
          newPercentage: 100,
          newSmileys: currentValues.smileys,
        };
      }

      const newSmileys = currentValues.smileys + 1;
      const overflownPercentage = unrestrictedNewPercentage - 100;

      return {
        newHearts: currentValues.hearts,
        newPercentage: overflownPercentage,
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
