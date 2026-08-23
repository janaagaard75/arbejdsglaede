import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { calculateNewValues } from "../mainState/calculateNewValues";
import { KnownQrCode } from "../mainState/KnownQrCode";
import { ThemedText } from "../themed/ThemedText";
import { Summary } from "./Summary";

const minusSign = "\u2212";

interface Props {
  hearts: number;
  percentage: number;
  qrCode: "unknownQrCode" | KnownQrCode | undefined;
  smileys: number;
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

    switch (props.qrCode.type) {
      case "heart":
        return `${sign} 1 ${t("heart")}`;

      case "percentage":
        return `${sign} ${Math.abs(props.qrCode.amount)}%`;

      case "smiley":
        return `${sign} 1 ${t("smiley")}`;
    }
  })();

  const newValues = calculateNewValues(
    {
      hearts: props.hearts,
      percentage: props.percentage,
      smileys: props.smileys,
    },
    props.qrCode,
  );

  return (
    <View className="flex-1">
      <ThemedText className="text-center text-[30px]">{label}</ThemedText>
      <View className="flex-1 flex-row">
        <Summary
          hearts={props.hearts}
          percentage={props.percentage}
          smileys={props.smileys}
        />
        <View className="w-10 items-center justify-center">
          <ThemedText>⇨</ThemedText>
        </View>
        <Summary
          hearts={newValues.newHearts}
          percentage={newValues.newPercentage}
          smileys={newValues.newSmileys}
        />
      </View>
    </View>
  );
};
