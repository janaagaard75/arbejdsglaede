import { View, type ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import { useColors } from "../themed/useColors";

interface Props {
  /** Between 0 and 100, where 0 leaves the smiley empty and 100 fills it completely. */
  percentage: number;
}

const viewBoxSize = 256;
const waterlineTransitionInMilliseconds = 400;

// The inner edge of the ring. The fill rises between these two, so that 0 percent lands exactly on the outlined smiley and 100 percent exactly on the filled one.
const interiorTopY = 40;
const interiorBottomY = 216;

/** The same two Phosphor Smiley weights that SmileyIcon and SmileyOutlineIcon draw. https://phosphoricons.com/?q=smiley */
const filledSmiley =
  "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM80,108a12,12,0,1,1,12,12A12,12,0,0,1,80,108Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,176,108Zm-1.07,48c-10.29,17.79-27.4,28-46.93,28s-36.63-10.2-46.92-28a8,8,0,1,1,13.84-8c7.47,12.91,19.21,20,33.08,20s25.61-7.1,33.07-20a8,8,0,0,1,13.86,8Z";
const outlinedSmiley =
  "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM80,108a12,12,0,1,1,12,12A12,12,0,0,1,80,108Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,176,108Zm-1.07,48c-10.29,17.79-27.4,28-46.93,28s-36.63-10.2-46.92-28a8,8,0,1,1,13.84-8c7.47,12.91,19.21,20,33.08,20s25.61-7.1,33.07-20a8,8,0,0,1,13.86,8Z";

// The waterline is a pair of windows rather than an SVG clip path, because Reanimated ignores a style on an SVG element until that style first changes, which leaves the smiley solid on the very first render.
const windowStyle: ViewStyle = {
  left: 0,
  overflow: "hidden",
  position: "absolute",
  right: 0,
};

// The smiley keeps its full size while its window shrinks, so that the window reveals part of it instead of scaling it down.
const smileyStyle: ViewStyle = {
  aspectRatio: 1,
  position: "absolute",
  width: "100%",
};

export const BigSmiley = (props: Props) => {
  const orange = useColors().orange;

  const roundedPercentage = Math.round(props.percentage);
  const waterlineY =
    interiorBottomY
    - ((interiorBottomY - interiorTopY) * roundedPercentage) / 100;
  const waterlinePercentage = (100 * waterlineY) / viewBoxSize;

  return (
    // Callers set the size of the smiley through the width of the view they wrap it in, rather than by passing a size.
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
          <Svg
            fill={orange}
            viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
          >
            <Path d={outlinedSmiley} />
          </Svg>
        </View>
      </Animated.View>
      <Animated.View
        style={[
          windowStyle,
          {
            bottom: 0,
            height: `${100 - waterlinePercentage}%`,
            transitionDuration: waterlineTransitionInMilliseconds,
            transitionProperty: "height",
          },
        ]}
      >
        <View style={[smileyStyle, { bottom: 0 }]}>
          <Svg
            fill={orange}
            viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
          >
            <Path d={filledSmiley} />
          </Svg>
        </View>
      </Animated.View>
    </View>
  );
};
