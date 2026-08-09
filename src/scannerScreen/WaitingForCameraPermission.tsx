import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "../themed/ThemedText";
import { useColors } from "../themed/useColors";

export const WaitingForCameraPermission = () => {
  const { t } = useTranslation();
  const colors = useColors();

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
        flex: 1,
      }}
    >
      <ThemedText className="mx-7.5 mt-7.5 flex-1">
        {t("waitingForCameraPermission")}
      </ThemedText>
    </SafeAreaView>
  );
};
