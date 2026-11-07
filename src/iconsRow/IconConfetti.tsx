import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { iconTransitionDurations } from "./iconTransitionDurations";
import { useColors } from "../themed/useColors";

const burstDuration =
  iconTransitionDurations.add - iconTransitionDurations.addDelay;
const particleCount = 22;
const particles = Array.from({ length: particleCount }, (_, index) => {
  const direction = index % 2 === 0 ? -1 : 1;
  return {
    drift: direction * (22 + ((index * 17) % 58)),
    lift: 24 + ((index * 23) % 86),
    size: 4 + ((index * 7) % 6),
    spin: direction * (110 + ((index * 31) % 220)),
    startX: direction * (8 + ((index * 13) % 15)),
  };
});

interface ParticleProps {
  color: string;
  particle: (typeof particles)[number];
  progress: SharedValue<number>;
}

const ConfettiParticle = ({ color, particle, progress }: ParticleProps) => {
  const { drift, lift, size, spin, startX } = particle;
  const animatedStyle = useAnimatedStyle(() => {
    const time = progress.get();
    return {
      opacity: interpolate(time, [0, 0.09, 0.58, 1], [0, 1, 1, 0]),
      transform: [
        { translateX: startX + drift * time },
        { translateY: -lift * 4 * time * (1 - time) + 58 * time * time },
        { rotate: `${spin * time}deg` },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          backgroundColor: color,
          borderRadius: 1,
          height: size * 1.5,
          left: 0,
          position: "absolute",
          top: 0,
          width: size,
        },
        animatedStyle,
      ]}
    />
  );
};

export const IconConfetti = () => {
  const colors = useColors();
  const particleColors = [colors.orange, colors.green, colors.text];
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.set(
      withDelay(
        iconTransitionDurations.addDelay,
        withTiming(1, { duration: burstDuration, easing: Easing.linear }),
      ),
    );
  }, [progress]);

  return (
    <View
      accessibilityElementsHidden
      className="absolute inset-0 items-center justify-center"
      importantForAccessibility="no-hide-descendants"
      pointerEvents="none"
    >
      <View>
        {particles.map((particle, index) => (
          <ConfettiParticle
            color={particleColors[index % particleColors.length]}
            key={particle.startX}
            particle={particle}
            progress={progress}
          />
        ))}
      </View>
    </View>
  );
};
