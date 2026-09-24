import { AccessibilityActionEvent, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  clamp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { ThemedText } from "../themed/ThemedText";
import { useColors } from "../themed/useColors";
import { ArrowRightIcon } from "./ArrowRightIcon";

interface Props {
  buttonWidth: number;
  children: string;
  disabled: boolean;
  onConfirm: () => void;
  onInteractionCancel?: () => void;
  onInteractionStart?: () => void;
  sliderWidth: number;
}

export const SlideToConfirm = (props: Props) => {
  const animatedPosition = useSharedValue(0);
  const colors = useColors();

  const dropZoneWidth = 20;
  const maxDx = props.sliderWidth - props.buttonWidth;
  const onInteractionCancel = props.onInteractionCancel;
  const onInteractionStart = props.onInteractionStart;
  const onConfirm = props.onConfirm;

  const confirmAccessibly = () => {
    if (props.disabled) {
      return;
    }

    props.onInteractionStart?.();
    props.onConfirm();
  };

  const handleAccessibilityAction = (event: AccessibilityActionEvent) => {
    if (event.nativeEvent.actionName === "activate") {
      confirmAccessibly();
    }
  };

  // The pan activates on horizontal movement and fails on vertical movement, letting a downward swipe on the button dismiss the modal instead.
  const pan = Gesture.Pan()
    .enabled(!props.disabled)
    .activeOffsetX([-10, 10])
    .failOffsetY([-20, 20])
    .onStart(() => {
      if (onInteractionStart !== undefined) {
        scheduleOnRN(onInteractionStart);
      }
    })
    .onChange((event) => {
      animatedPosition.value = clamp(event.translationX, 0, maxDx);
    })
    .onEnd(() => {
      if (maxDx - animatedPosition.value <= dropZoneWidth) {
        scheduleOnRN(onConfirm);
      } else if (onInteractionCancel !== undefined) {
        scheduleOnRN(onInteractionCancel);
      }
    })
    .onFinalize((_event, success) => {
      if (!success && onInteractionCancel !== undefined) {
        scheduleOnRN(onInteractionCancel);
      }

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

  const trackBorderColor = props.disabled ? colors.disabledText : colors.text;
  const handleBackgroundColor = props.disabled ? "transparent" : colors.text;
  const handleBorderColor = props.disabled ? colors.disabledText : colors.text;
  const labelColor = props.disabled ? colors.disabledText : colors.background;

  return (
    <View
      accessibilityActions={[{ name: "activate" }]}
      accessibilityLabel={props.children}
      accessibilityRole="button"
      accessibilityState={{ disabled: props.disabled }}
      accessible={true}
      className="rounded-full border-2 p-0.75"
      onAccessibilityAction={handleAccessibilityAction}
      onAccessibilityTap={confirmAccessibly}
      style={{
        borderColor: trackBorderColor,
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
            className="flex-row items-center gap-2.5 rounded-full border-2 px-3.5 py-1.5"
            style={{
              backgroundColor: handleBackgroundColor,
              borderColor: handleBorderColor,
            }}
          >
            <ThemedText
              className="font-semibold"
              style={{ color: labelColor }}
            >
              {props.children}
            </ThemedText>
            <ArrowRightIcon color={labelColor} />
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};
