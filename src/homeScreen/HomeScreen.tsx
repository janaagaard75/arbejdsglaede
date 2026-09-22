import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AnimatedIconsRow } from "../iconsRow/AnimatedIconsRow";
import { HeartIcon } from "../iconsRow/HeartIcon";
import { HeartOutlineIcon } from "../iconsRow/HeartOutlineIcon";
import { SmileyIcon } from "../iconsRow/SmileyIcon";
import { SmileyOutlineIcon } from "../iconsRow/SmileyOutlineIcon";
import { maximumIcons } from "../mainState/maximumIcons";
import { ThemedLinkButton } from "../themed/ThemedLinkButton";
import { ThemedText } from "../themed/ThemedText";
import { ThemedView } from "../themed/ThemedView";
import { useColors } from "../themed/useColors";
import { SmileyAndPercentage } from "./SmileyAndPercentage";
import { groupDigitsWithSpaces } from "./groupDigitsWithSpaces";
import { scoreForValues, useQrChangeAnimation } from "./useQrChangeAnimation";

export const HomeScreen = observer(() => {
  const { t } = useTranslation();
  const colors = useColors();
  const { displayedValues, iconTransition } = useQrChangeAnimation();

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
        flex: 1,
      }}
    >
      <ThemedView className="flex-1">
        <View className="m-5 flex-row justify-end gap-2.5">
          {__DEV__ && (
            <ThemedLinkButton
              href="/dev"
              variant="secondary"
            >
              Screens
            </ThemedLinkButton>
          )}
          <ThemedLinkButton
            href="/reset"
            variant="secondary"
          >
            {t("reset")}
          </ThemedLinkButton>
        </View>
        <View className="flex-1 justify-center">
          <View className="mt-10 items-center">
            <ThemedText
              className="text-[24px]"
              style={{ color: colors.mutedText }}
            >
              {t("happinessPoints")}
            </ThemedText>
            <ThemedText className="text-[64px] leading-18 font-bold">
              {groupDigitsWithSpaces(scoreForValues(displayedValues))}
            </ThemedText>
          </View>
          <View className="flex-1 justify-center">
            <SmileyAndPercentage percentage={displayedValues.percentage} />
            <View className="h-10" />
            <AnimatedIconsRow
              currentValue={displayedValues.smileys}
              excludedIcon={<SmileyOutlineIcon />}
              gap={3}
              includedIcon={<SmileyIcon />}
              maximum={maximumIcons}
              size={30}
              transition={iconTransition}
              type="smiley"
            />
            <View className="h-5" />
            <AnimatedIconsRow
              currentValue={displayedValues.hearts}
              excludedIcon={<HeartOutlineIcon />}
              gap={3}
              includedIcon={<HeartIcon />}
              maximum={maximumIcons}
              size={30}
              transition={iconTransition}
              type="heart"
            />
          </View>
          <View className="mb-20 justify-end">
            <ThemedLinkButton
              href="/scan"
              variant="primary"
            >
              {t("scanQrCode")}
            </ThemedLinkButton>
          </View>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
});
