import { Pressable, type PressableProps } from "react-native";
import Animated from "react-native-reanimated";
import { ThemedText } from "./ThemedText";
import { usePressScale } from "./usePressScale";

interface Props {
  children: string;
  onPress: PressableProps["onPress"];
}

export const ThemedTextButton = (props: Props) => {
  const pressScale = usePressScale();

  return (
    <Pressable
      className="self-center"
      onPress={props.onPress}
      onPressIn={pressScale.onPressIn}
      onPressOut={pressScale.onPressOut}
    >
      <Animated.View
        className="rounded-lg border-2 border-zinc-800 px-4 py-1 dark:border-zinc-200"
        style={pressScale.pressStyle}
      >
        <ThemedText>{props.children}</ThemedText>
      </Animated.View>
    </Pressable>
  );
};
