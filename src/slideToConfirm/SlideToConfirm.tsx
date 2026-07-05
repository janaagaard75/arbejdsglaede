import { memo, useCallback, useRef } from "react";
import { Animated, GestureResponderEvent, View } from "react-native";
import { clamp } from "react-native-reanimated";
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

export const SlideToConfirm = memo((props: Props) => {
  const startPageX = useRef(0);
  const animatedPosition = useRef(new Animated.Value(0)).current;

  const dropZoneWidth = 20;
  const maxDx = props.sliderWidth - props.buttonWidth;

  const end = useCallback(
    (event: GestureResponderEvent) => {
      if (props.disabled) {
        return;
      }

      const dx = event.nativeEvent.pageX - startPageX.current;
      const withinDropZone = maxDx - dx <= dropZoneWidth;

      if (withinDropZone) {
        props.onConfirm();
      }

      Animated.timing(animatedPosition, {
        duration: 100,
        toValue: 0,
        useNativeDriver: false,
      }).start();
    },
    [animatedPosition, maxDx, props],
  );

  const move = useCallback(
    (event: GestureResponderEvent) => {
      if (props.disabled) {
        return;
      }

      const dx = event.nativeEvent.pageX - startPageX.current;
      const clampedDx = clamp(dx, 0, maxDx);
      animatedPosition.setValue(clampedDx);
    },
    [animatedPosition, maxDx, props.disabled],
  );

  const start = useCallback(
    (event: GestureResponderEvent) => {
      if (props.disabled) {
        return;
      }

      startPageX.current = event.nativeEvent.pageX;
    },
    [props.disabled],
  );

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
        onTouchCancel={end}
        onTouchEnd={end}
        onTouchEndCapture={end}
        onTouchMove={move}
        onTouchStart={start}
        style={{
          transform: [
            {
              translateX: animatedPosition,
            },
          ],
          width: props.sliderWidth,
        }}
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
});
