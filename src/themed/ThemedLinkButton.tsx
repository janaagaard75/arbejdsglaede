import { Link, type LinkProps } from "expo-router";
import { Pressable } from "react-native";
import Animated from "react-native-reanimated";
import { ThemedText } from "./ThemedText";
import { useColors } from "./useColors";
import { usePressScale } from "./usePressScale";

interface Props {
  children: string;
  href: LinkProps["href"];
}

// The press goes through a Pressable rather than through the Link itself, because a Link renders a Text, and a pressed Text highlights its own background on iOS.
export const ThemedLinkButton = (props: Props) => {
  const colors = useColors();
  const pressScale = usePressScale();

  return (
    <Link
      asChild
      href={props.href}
    >
      <Pressable
        className="self-center"
        onPressIn={pressScale.onPressIn}
        onPressOut={pressScale.onPressOut}
      >
        <Animated.View
          className="rounded-lg border-2 px-4 py-1"
          style={[pressScale.pressStyle, { borderColor: colors.text }]}
        >
          <ThemedText>{props.children}</ThemedText>
        </Animated.View>
      </Pressable>
    </Link>
  );
};
