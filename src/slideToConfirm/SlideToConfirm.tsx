import { useCallback, useRef } from "react";
import { GestureResponderEvent, View } from "react-native";
import Animated, {
  clamp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { cn } from "../cn";
import { ThemedText } from "../themed/ThemedText";
import { ArrowRightIcon } from "./ArrowRightIcon";

interface Props {
  buttonWidth: number;
  children: string;
  disabled: boolean;
  onConfirm: () => void;
  sliderWidth: number;
}

export const SlideToConfirm = (props: Props) => {
  const hasConfirmed = useRef(false);
  const startPageX = useRef(0);
  const animatedPosition = useSharedValue(0);

  const dropZoneWidth = 20;
  const maxDx = props.sliderWidth - props.buttonWidth;

  const end = useCallback(
    (event: GestureResponderEvent) => {
      if (props.disabled || hasConfirmed.current) {
        return;
      }

      const dx = event.nativeEvent.pageX - startPageX.current;
      const withinDropZone = maxDx - dx <= dropZoneWidth;

      if (withinDropZone) {
        hasConfirmed.current = true;
        props.onConfirm();
      }

      animatedPosition.set(withTiming(0, { duration: 100 }));
    },
    [animatedPosition, maxDx, props],
  );

  const move = useCallback(
    (event: GestureResponderEvent) => {
      if (props.disabled) {
        return;
      }

      const dx = event.nativeEvent.pageX - startPageX.current;
      animatedPosition.set(clamp(dx, 0, maxDx));
    },
    [animatedPosition, maxDx, props.disabled],
  );

  const start = useCallback(
    (event: GestureResponderEvent) => {
      if (props.disabled) {
        return;
      }

      hasConfirmed.current = false;
      startPageX.current = event.nativeEvent.pageX;
    },
    [props.disabled],
  );

  const animatedTranslation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: animatedPosition.value,
        },
      ],
    };
  });

  const borderClasses = props.disabled
    ? "border-zinc-400 dark:border-zinc-500"
    : "border-zinc-800 dark:border-zinc-200";

  return (
    <View
      className={cn("rounded-[10px] border-2 p-[3px]", borderClasses)}
      style={{
        width: props.sliderWidth + 2 * (3 + 2),
      }}
    >
      <Animated.View
        onResponderGrant={start}
        onResponderMove={move}
        onResponderRelease={end}
        onResponderTerminate={end}
        onResponderTerminationRequest={() => false}
        onStartShouldSetResponder={() => true}
        style={[
          animatedTranslation,
          {
            width: props.sliderWidth,
          },
        ]}
      >
        <View
          className={cn(
            "flex-row items-center gap-2.5 rounded-md border-2 px-3.5 py-1.5",
            borderClasses,
          )}
          style={{
            width: props.buttonWidth,
          }}
        >
          <ThemedText
            className={cn(props.disabled && "text-zinc-400 dark:text-zinc-500")}
          >
            {props.children}
          </ThemedText>
          <ArrowRightIcon />
        </View>
      </Animated.View>
    </View>
  );
};
