import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeartIcon } from "./iconsRow/HeartIcon";
import { HeartOutlineIcon } from "./iconsRow/HeartOutlineIcon";
import { IconsRow } from "./iconsRow/IconsRow";
import { SmileyIcon } from "./iconsRow/SmileyIcon";
import { SmileyOutlineIcon } from "./iconsRow/SmileyOutlineIcon";
import { mainStore } from "./mainState/mainStore";
import { maximumIcons } from "./mainState/maximumIcons";
import { BigSmiley } from "./smiley/BigSmiley";
import { SlideToConfirm } from "./slideToConfirm/SlideToConfirm";
import { ThemedText } from "./themed/ThemedText";
import { ThemedView } from "./themed/ThemedView";
import { useColors } from "./themed/useColors";

const resetPercentage = 20;
const resetIcons = 0;

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
        <View className="items-center gap-4 self-center">
          <View className="w-50 items-center">
            <BigSmiley percentage={resetPercentage} />
          </View>
          <IconsRow
            currentValue={resetIcons}
            excludedIcon={<SmileyOutlineIcon />}
            gap={3}
            includedIcon={<SmileyIcon />}
            maximum={maximumIcons}
            size={20}
          />
          <IconsRow
            currentValue={resetIcons}
            excludedIcon={<HeartOutlineIcon />}
            gap={3}
            includedIcon={<HeartIcon />}
            maximum={maximumIcons}
            size={20}
          />
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
