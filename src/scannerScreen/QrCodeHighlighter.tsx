import { BarcodeBounds } from "expo-camera";
import { View } from "react-native";
import { useColors } from "../colors/useColors";

interface Props {
  readonly bounds: BarcodeBounds | undefined;
}

export const QrCodeHighlighter = (props: Props) => {
  const green = useColors().green;

  if (props.bounds === undefined) {
    return <></>;
  }

  return (
    <View
      style={{
        borderColor: green,
        borderWidth: 2,
        height: props.bounds.size.height,
        left: props.bounds.origin.x,
        position: "absolute",
        top: props.bounds.origin.y,
        width: props.bounds.size.width,
      }}
    />
  );
};
