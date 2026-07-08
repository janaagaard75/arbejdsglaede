import { observer } from "mobx-react-lite";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColors } from "../colors/useColors";
import { FlameIcon } from "../iconsRow/FlameIcon";
import { FlameOutlineIcon } from "../iconsRow/FlameOutlineIcon";
import { HeartIcon } from "../iconsRow/HeartIcon";
import { HeartOutlineIcon } from "../iconsRow/HeartOutlineIcon";
import { IconsRow } from "../iconsRow/IconsRow";
import { mainStore } from "../mainState/MainStore";
import { maximumIcons } from "../mainState/maximumIcons";
import { ThemedLinkButton } from "../themed/ThemedLinkButton";
import { ThemedText } from "../themed/ThemedText";
import { ThemedView } from "../themed/ThemedView";
import { BatteryAndPercentage } from "./BatteryAndPercentage";

export const HomeScreen = observer(() => {
  const colors = useColors();

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
        flex: 1,
      }}
    >
      <ThemedView className="flex-1">
        <View className="m-5 self-end">
          <ThemedLinkButton href="/reset">Nulstil</ThemedLinkButton>
        </View>
        <View className="flex-1 justify-center">
          <View className="mt-10">
            <ThemedText className="self-center text-[28px] font-bold">
              {`Trivselsscore: ${mainStore.score}`}
            </ThemedText>
          </View>
          <View className="flex-1 justify-center">
            <BatteryAndPercentage percentage={mainStore.percentage} />
            <View className="h-10" />
            <IconsRow
              currentValue={mainStore.hearts}
              excludedIcon={<HeartOutlineIcon />}
              gap={3}
              includedIcon={<HeartIcon />}
              maximum={maximumIcons}
              size={30}
            />
            <View className="h-5" />
            <IconsRow
              currentValue={mainStore.flames}
              excludedIcon={<FlameOutlineIcon />}
              gap={3}
              includedIcon={<FlameIcon />}
              maximum={maximumIcons}
              size={30}
            />
          </View>
          <View className="mb-20 justify-end">
            <ThemedLinkButton href="/scan">Scan QR-kode</ThemedLinkButton>
          </View>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
});
