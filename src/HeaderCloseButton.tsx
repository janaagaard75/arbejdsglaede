import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import Animated from "react-native-reanimated";
import { ThemedText } from "./themed/ThemedText";
import { usePressScale } from "./themed/usePressScale";

export const HeaderCloseButton = () => {
  const router = useRouter();
  const pressScale = usePressScale();

  const close = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <Pressable
      hitSlop={10}
      onPress={close}
      onPressIn={pressScale.onPressIn}
      onPressOut={pressScale.onPressOut}
    >
      <Animated.View style={pressScale.pressStyle}>
        <ThemedText>✕</ThemedText>
      </Animated.View>
    </Pressable>
  );
};
