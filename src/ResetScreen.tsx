import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Battery } from "./battery/Battery";
import { mainStore } from "./mainState/mainStore";
import { SlideToConfirm } from "./slideToConfirm/SlideToConfirm";
import { ThemedText } from "./themed/ThemedText";
import { ThemedView } from "./themed/ThemedView";
import { useColors } from "./themed/useColors";

const resetPercentage = 20;

export const ResetScreen = () => {
  const { t } = useTranslation();
  const colors = useColors();
  const router = useRouter();

  const reset = () => {
    mainStore.reset();

    // Wrapping in this conditional removes a warning from the router. Don't know why.
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
        flex: 1,
      }}
    >
      <ThemedView className="flex-1 gap-7.5">
        <ThemedText className="mx-7.5 mt-50">
          {t("confirmThatYouWantToReset", { percentage: resetPercentage })}
        </ThemedText>
        <View className="w-50 items-center self-center">
          <Battery percentage={resetPercentage} />
        </View>
        <View className="mx-auto mb-20 flex-1 justify-end">
          <SlideToConfirm
            buttonWidth={140}
            disabled={false}
            onConfirm={reset}
            sliderWidth={250}
          >
            {t("confirm")}
          </SlideToConfirm>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
};
