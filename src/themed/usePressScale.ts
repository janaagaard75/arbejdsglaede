import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const pressedScale = 0.95;
const transitionDuration = 100;

// The shared value is read and written through get and set rather than through value, because the React Compiler treats assigning to value as mutating a captured variable.
export const usePressScale = () => {
  const pressProgress = useSharedValue(0);

  const pressStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: 1 - pressProgress.get() * (1 - pressedScale) }],
    };
  });

  return {
    onPressIn: () => {
      pressProgress.set(withTiming(1, { duration: transitionDuration }));
    },
    onPressOut: () => {
      pressProgress.set(withTiming(0, { duration: transitionDuration }));
    },
    pressStyle: pressStyle,
  };
};
