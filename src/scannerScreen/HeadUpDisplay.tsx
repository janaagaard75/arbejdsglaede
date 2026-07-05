import { View } from "react-native";

interface Props {
  readonly viewfinderSize: number;
}

export const HeadUpDisplay = (props: Props) => {
  const cornerBorderWidth = 4;
  const cornerOpacity = 0.4;
  const cornerRadius = 12;
  const cornerSize = 35;
  const hudMargin = 70;

  return (
    <>
      <View
        style={{
          borderColor: "white",
          borderLeftWidth: cornerBorderWidth,
          borderTopLeftRadius: cornerRadius,
          borderTopWidth: cornerBorderWidth,
          height: cornerSize,
          marginLeft: hudMargin,
          marginTop: hudMargin,
          opacity: cornerOpacity,
          position: "absolute",
          width: cornerSize,
        }}
      />
      <View
        style={{
          borderColor: "white",
          borderRightWidth: cornerBorderWidth,
          borderTopRightRadius: cornerRadius,
          borderTopWidth: cornerBorderWidth,
          height: cornerSize,
          marginLeft: props.viewfinderSize - (hudMargin + cornerSize),
          marginTop: hudMargin,
          opacity: cornerOpacity,
          position: "absolute",
          width: cornerSize,
        }}
      />
      <View
        style={{
          borderBottomLeftRadius: cornerRadius,
          borderBottomWidth: cornerBorderWidth,
          borderColor: "white",
          borderLeftWidth: cornerBorderWidth,
          height: cornerSize,
          marginLeft: hudMargin,
          marginTop: props.viewfinderSize - (hudMargin + cornerSize),
          opacity: cornerOpacity,
          position: "absolute",
          width: cornerSize,
        }}
      />
      <View
        style={{
          borderBottomRightRadius: cornerRadius,
          borderBottomWidth: cornerBorderWidth,
          borderColor: "white",
          borderRightWidth: cornerBorderWidth,
          height: cornerSize,
          marginLeft: props.viewfinderSize - (hudMargin + cornerSize),
          marginTop: props.viewfinderSize - (hudMargin + cornerSize),
          opacity: cornerOpacity,
          position: "absolute",
          width: cornerSize,
        }}
      />
    </>
  );
};
