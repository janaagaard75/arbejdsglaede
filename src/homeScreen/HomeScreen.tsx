import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeartIcon } from "../iconsRow/HeartIcon";
import { HeartOutlineIcon } from "../iconsRow/HeartOutlineIcon";
import { IconsRow } from "../iconsRow/IconsRow";
import { SmileyIcon } from "../iconsRow/SmileyIcon";
import { SmileyOutlineIcon } from "../iconsRow/SmileyOutlineIcon";
import { mainStore } from "../mainState/mainStore";
import { maximumIcons } from "../mainState/maximumIcons";
import { ThemedLinkButton } from "../themed/ThemedLinkButton";
import { ThemedText } from "../themed/ThemedText";
import { ThemedView } from "../themed/ThemedView";
import { useColors } from "../themed/useColors";
import { SmileyAndPercentage } from "./SmileyAndPercentage";
import { groupDigitsWithSpaces } from "./groupDigitsWithSpaces";

export const HomeScreen = observer(() => {
  const { t } = useTranslation();
  const colors = useColors();

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
            <ThemedText className="text-[64px] leading-[72px] font-bold">
              {groupDigitsWithSpaces(mainStore.score)}
            </ThemedText>
          </View>
          <View className="flex-1 justify-center">
            <SmileyAndPercentage percentage={mainStore.percentage} />
            <View className="h-10" />
            <IconsRow
              currentValue={mainStore.smileys}
              excludedIcon={<SmileyOutlineIcon />}
              gap={3}
              includedIcon={<SmileyIcon />}
              maximum={maximumIcons}
              size={30}
            />
            <View className="h-5" />
            <IconsRow
              currentValue={mainStore.hearts}
              excludedIcon={<HeartOutlineIcon />}
              gap={3}
              includedIcon={<HeartIcon />}
              maximum={maximumIcons}
              size={30}
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
