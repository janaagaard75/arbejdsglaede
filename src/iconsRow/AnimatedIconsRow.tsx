import { ReactNode, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export interface IconTransition {
  direction: "add" | "remove";
  id: number;
  indices: ReadonlyArray<number>;
  type: "heart" | "smiley";
}

interface IconSlotProps {
  excludedIcon: ReactNode;
  included: boolean;
  includedIcon: ReactNode;
  index: number;
  size: number;
  transition: IconTransition | undefined;
}

const IconSlot = (props: IconSlotProps) => {
  const reduceMotion = useReducedMotion();
  const opacity = useSharedValue(props.included ? 1 : 0);
  const scale = useSharedValue(1);
  const isTransitionTarget =
    props.transition?.indices.includes(props.index) === true;
  const showsRemovingIcon =
    isTransitionTarget && props.transition?.direction === "remove";

  // Animation props are commands from the parent sequence, so this effect intentionally handles each new command.
  useEffect(() => {
    cancelAnimation(opacity);
    cancelAnimation(scale);

    // eslint-disable-next-line react-you-might-not-need-an-effect/no-event-handler
    if (!isTransitionTarget || props.transition === undefined) {
      opacity.value = props.included ? 1 : 0;
      scale.value = 1;
      return;
    }

    // eslint-disable-next-line react-you-might-not-need-an-effect/no-event-handler
    if (props.transition.direction === "add") {
      opacity.value = 0;
      scale.value = reduceMotion ? 1 : 0;
      opacity.value = withTiming(1, { duration: reduceMotion ? 150 : 180 });
      scale.value = reduceMotion
        ? 1
        : withSequence(
            withTiming(1.1, { duration: 220 }),
            withSpring(1, { damping: 9, mass: 0.5, stiffness: 180 }),
          );
      return;
    }

    opacity.value = 1;
    scale.value = 1;
    opacity.value = withTiming(0, { duration: reduceMotion ? 150 : 350 });
    scale.value = reduceMotion ? 1 : withTiming(3, { duration: 350 });
  }, [
    isTransitionTarget,
    opacity,
    props.included,
    props.transition,
    reduceMotion,
    scale,
  ]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View style={{ height: props.size, width: props.size }}>
      <View style={styles.icon}>{props.excludedIcon}</View>
      {(props.included || showsRemovingIcon) && (
        <Animated.View style={[styles.icon, animatedStyle]}>
          {props.includedIcon}
        </Animated.View>
      )}
    </View>
  );
};

interface Props {
  currentValue: number;
  excludedIcon: ReactNode;
  gap: number;
  includedIcon: ReactNode;
  maximum: number;
  size: number;
  transition: IconTransition | undefined;
  type: IconTransition["type"];
}

export const AnimatedIconsRow = (props: Props) => {
  const transition =
    props.transition?.type === props.type ? props.transition : undefined;

  return (
    <View
      className="flex-row self-center"
      style={{ gap: props.gap }}
    >
      {Array.from({ length: props.maximum }).map((_, index) => (
        <IconSlot
          excludedIcon={props.excludedIcon}
          included={index < props.currentValue}
          includedIcon={props.includedIcon}
          index={index}
          // eslint-disable-next-line @eslint-react/no-array-index-key
          key={index}
          size={props.size}
          transition={transition}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
});
