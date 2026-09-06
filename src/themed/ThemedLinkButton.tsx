import { Link, type LinkProps } from "expo-router";
import { Pressable } from "react-native";
import Animated from "react-native-reanimated";
import { ThemedText } from "./ThemedText";
import { useButtonColors, type ButtonVariant } from "./useButtonColors";
import { usePressScale } from "./usePressScale";

interface Props {
  children: string;
  href: LinkProps["href"];
  variant: ButtonVariant;
}

// The press goes through a Pressable rather than through the Link itself, because a Link renders a Text, and a pressed Text highlights its own background on iOS.
export const ThemedLinkButton = (props: Props) => {
  const buttonColors = useButtonColors(props.variant);
  const pressScale = usePressScale();

  return (
    <Link
      asChild
      href={props.href}
    >
      <Pressable
        accessibilityLabel={props.children}
        accessibilityRole="button"
        className="self-center"
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
    </Link>
  );
};
