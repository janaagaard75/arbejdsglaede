import { Pressable, type PressableProps } from "react-native";
import Animated from "react-native-reanimated";
import { ThemedText } from "./ThemedText";
import { useButtonColors, type ButtonVariant } from "./useButtonColors";
import { usePressScale } from "./usePressScale";

interface Props {
  children: string;
  onPress: PressableProps["onPress"];
  variant: ButtonVariant;
}

export const ThemedTextButton = (props: Props) => {
  const buttonColors = useButtonColors(props.variant);
  const pressScale = usePressScale();

  return (
    <Pressable
      className="self-center"
      onPress={props.onPress}
      onPressIn={pressScale.onPressIn}
      onPressOut={pressScale.onPressOut}
    >
      <Animated.View
        className="rounded-full border-2 px-5 py-1.5"
        style={[
          pressScale.pressStyle,
          {
            backgroundColor: buttonColors.background,
            borderColor: buttonColors.border,
          },
        ]}
      >
        <ThemedText
          className="font-semibold"
          style={{ color: buttonColors.label }}
        >
          {props.children}
        </ThemedText>
      </Animated.View>
    </Pressable>
  );
};
