import { memo } from "react";
import { View } from "react-native";

interface Props {
  readonly scannerMargin: number;
  readonly viewfinderSize: number;
}

export const HeadUpDisplay = memo((props: Props) => {
  const cornerBorderWidth = 4;
  const cornerOpacity = 0.4;
  const cornerRadius = 12;
  const cornerSize = 40;

  return (
    <>
      <View
        style={{
          borderColor: "white",
          borderLeftWidth: cornerBorderWidth,
          borderTopLeftRadius: cornerRadius,
          borderTopWidth: cornerBorderWidth,
          height: cornerSize,
          marginLeft: props.scannerMargin,
          marginTop: props.scannerMargin,
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
          marginLeft: props.viewfinderSize - (props.scannerMargin + cornerSize),
          marginTop: props.scannerMargin,
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
          marginLeft: props.scannerMargin,
          marginTop: props.viewfinderSize - (props.scannerMargin + cornerSize),
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
          marginLeft: props.viewfinderSize - (props.scannerMargin + cornerSize),
          marginTop: props.viewfinderSize - (props.scannerMargin + cornerSize),
          opacity: cornerOpacity,
          position: "absolute",
          width: cornerSize,
        }}
      />
    </>
  );
});
