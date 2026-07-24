import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { calculateNewValues } from "../mainState/calculateNewValues";
import { QrCode } from "../mainState/QrCode";
import { ThemedText } from "../themed/ThemedText";
import { Summary } from "./Summary";

interface Props {
  flames: number;
  hearts: number;
  percentage: number;
  qrCode: QrCode | undefined;
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

  const label = (() => {
    const sign = props.qrCode.amount > 0 ? "+" : "−";

    switch (props.qrCode.type) {
      case "flame":
        return `${sign} 1 ${t("flame")}`;

      case "heart":
        return `${sign} 1 ${t("heart")}`;

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
