import { useRouter } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Battery } from "./battery/Battery";
import { useColors } from "./colors/useColors";
import { mainStore } from "./mainState/MainStore";
import { SlideToConfirm } from "./slideToConfirm/SlideToConfirm";
import { ThemedText } from "./themed/ThemedText";
import { ThemedView } from "./themed/ThemedView";

export const ResetScreen = () => {
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
          Bekræft at du vil nulstille til 20% og fjerne alle hjerter og flammer.
        </ThemedText>
        <View className="w-50 items-center self-center">
          <Battery percentage={20} />
        </View>
        <View className="mx-auto mb-20 flex-1 justify-end">
          <SlideToConfirm
            buttonWidth={140}
            disabled={false}
            onConfirm={reset}
            sliderWidth={250}
          >
            Bekræft
          </SlideToConfirm>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
};
