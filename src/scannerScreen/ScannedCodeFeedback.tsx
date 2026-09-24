import { useTranslation } from "react-i18next";
import { KnownQrCode } from "../mainState/KnownQrCode";
import { ThemedText } from "../themed/ThemedText";

const minusSign = "\u2212";

interface Props {
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

    switch (props.qrCode.type) {
      case "heart":
        return `${sign}❤️`;

      case "percentage":
        return `${sign}${Math.abs(props.qrCode.amount)}%`;

      case "smiley":
        return `${sign}🙂`;
    }
  })();

  return (
    <ThemedText className="text-center text-[48px] leading-15 font-bold">
      {label}
    </ThemedText>
  );
};
