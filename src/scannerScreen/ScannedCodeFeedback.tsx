import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { calculateNewValues } from "../mainState/calculateNewValues";
import { KnownQrCode } from "../mainState/KnownQrCode";
import { ThemedText } from "../themed/ThemedText";
import { Summary } from "./Summary";

const minusSign = "\u2212";

interface Props {
  flames: number;
  hearts: number;
  percentage: number;
  qrCode: "unknownQrCode" | KnownQrCode | undefined;
}

export const ScannedCodeFeedback = (props: Props) => {
  const { t } = useTranslation();

  if (props.qrCode === undefined) {
    return (
      <ThemedText className="text-center text-[30px]">
        {t("scanAQrCode")}
      </ThemedText>
    );
  }

  if (props.qrCode === "unknownQrCode") {
    return (
      <ThemedText className="text-center text-[30px]">
        {t("unknownQrCode")}
      </ThemedText>
    );
  }

  const label = (() => {
    const sign = props.qrCode.amount > 0 ? "+" : minusSign;

    // The QR codes keep their original names, so the flame code is the one that awards a heart, and the heart code the one that awards a smiley.
    switch (props.qrCode.type) {
      case "flame":
        return `${sign} 1 ${t("heart")}`;

      case "heart":
        return `${sign} 1 ${t("smiley")}`;

      case "percentage":
        return `${sign} ${Math.abs(props.qrCode.amount)}%`;
    }
  })();

  const newValues = calculateNewValues(
    {
      flames: props.flames,
      hearts: props.hearts,
      percentage: props.percentage,
    },
    props.qrCode,
  );

  return (
    <View className="flex-1">
      <ThemedText className="text-center text-[30px]">{label}</ThemedText>
      <View className="flex-1 flex-row">
        <Summary
          flames={props.flames}
          hearts={props.hearts}
          percentage={props.percentage}
        />
        <View className="w-10 items-center justify-center">
          <ThemedText>⇨</ThemedText>
        </View>
        <Summary
          flames={newValues.newFlames}
          hearts={newValues.newHearts}
          percentage={newValues.newPercentage}
        />
      </View>
    </View>
  );
};
