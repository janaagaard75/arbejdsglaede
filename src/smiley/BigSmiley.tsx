import {
  Image,
  StyleSheet,
  View,
  type ImageSourcePropType,
  type ViewStyle,
} from "react-native";
import Animated from "react-native-reanimated";
import { useAppColorScheme } from "../themed/useAppColorScheme";

interface Props {
  percentage: number;
}

const imageSize = 512;
const faceTopY = 32;
const faceBottomY = 480;
const waterlineTransitionInMilliseconds = 400;
const waterlineOverlap = 1;
const colorSmiley = require("../../assets/smiley/fluent-grinning-face-with-smiling-eyes-color.png");
const graySmiley = {
  dark: require("../../assets/smiley/fluent-grinning-face-with-smiling-eyes-gray-dark-mode.png"),
  light: require("../../assets/smiley/fluent-grinning-face-with-smiling-eyes-gray-light-mode.png"),
};

const windowStyle: ViewStyle = {
  left: 0,
  overflow: "hidden",
  position: "absolute",
  right: 0,
};

const smileyStyle: ViewStyle = {
  aspectRatio: 1,
  position: "absolute",
  width: "100%",
};

const SmileyArtwork = ({ source }: { source: ImageSourcePropType }) => (
  <Image
    resizeMode="contain"
    source={source}
    style={styles.artwork}
  />
);

const getWaterlinePercentage = (percentage: number, waterlineY: number) => {
  if (percentage === 0) {
    return 100;
  }

  if (percentage === 100) {
    return 0;
  }

  return (100 * waterlineY) / imageSize;
};

export const BigSmiley = (props: Props) => {
  const colorScheme = useAppColorScheme();
  const percentage = Math.min(100, Math.max(0, Math.round(props.percentage)));
  const waterlineY =
    faceBottomY - ((faceBottomY - faceTopY) * percentage) / 100;
  const waterlinePercentage = getWaterlinePercentage(percentage, waterlineY);
  const overlapPercentage =
    percentage === 0 || percentage === 100
      ? 0
      : (100 * waterlineOverlap) / imageSize;

  return (
    <View className="aspect-square w-[40%] self-center">
      <Animated.View
        style={[
          windowStyle,
          {
            height: `${waterlinePercentage}%`,
            top: 0,
            transitionDuration: waterlineTransitionInMilliseconds,
            transitionProperty: "height",
          },
        ]}
      >
        <View style={[smileyStyle, { top: 0 }]}>
          <SmileyArtwork source={graySmiley[colorScheme]} />
        </View>
      </Animated.View>
      <Animated.View
        style={[
          windowStyle,
          {
            bottom: 0,
            height: `${100 - waterlinePercentage + overlapPercentage}%`,
            transitionDuration: waterlineTransitionInMilliseconds,
            transitionProperty: "height",
          },
        ]}
      >
        <View style={[smileyStyle, { bottom: 0 }]}>
          <SmileyArtwork source={colorSmiley} />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  artwork: {
    height: "100%",
    width: "100%",
  },
});
