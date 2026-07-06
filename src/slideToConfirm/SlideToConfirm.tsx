import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  clamp,
  runOnJS,
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
  const animatedPosition = useSharedValue(0);

  const dropZoneWidth = 20;
  const maxDx = props.sliderWidth - props.buttonWidth;
  const onConfirm = props.onConfirm;

  // The pan activates on horizontal movement and fails on vertical movement, letting a downward swipe on the button dismiss the modal instead.
  const pan = Gesture.Pan()
    .enabled(!props.disabled)
    .activeOffsetX([-10, 10])
    .failOffsetY([-20, 20])
    .onChange((event) => {
      animatedPosition.value = clamp(event.translationX, 0, maxDx);
    })
    .onEnd(() => {
      if (maxDx - animatedPosition.value <= dropZoneWidth) {
        runOnJS(onConfirm)();
      }
    })
    .onFinalize(() => {
      animatedPosition.value = withTiming(0, { duration: 100 });
    });

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
      <GestureDetector gesture={pan}>
        <Animated.View
          style={[
            animatedTranslation,
            {
              width: props.buttonWidth,
            },
          ]}
        >
          <View
            className={cn(
              "flex-row items-center gap-2.5 rounded-md border-2 px-3.5 py-1.5",
              borderClasses,
            )}
          >
            <ThemedText
              className={cn(
                props.disabled && "text-zinc-400 dark:text-zinc-500",
              )}
            >
              {props.children}
            </ThemedText>
            <ArrowRightIcon />
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};
