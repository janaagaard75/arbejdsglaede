import { View } from "react-native";

interface Props {
  readonly viewfinderSize: number;
}

export const HeadUpDisplay = (props: Props) => {
  const cornerSize = 35;
  const hudMargin = 70;

  return (
    <>
      <View
        className="absolute rounded-tl-xl border-t-4 border-l-4 border-white opacity-40"
        style={{
          height: cornerSize,
          marginLeft: hudMargin,
          marginTop: hudMargin,
          width: cornerSize,
        }}
      />
      <View
        className="absolute rounded-tr-xl border-t-4 border-r-4 border-white opacity-40"
        style={{
          height: cornerSize,
          marginLeft: props.viewfinderSize - (hudMargin + cornerSize),
          marginTop: hudMargin,
          width: cornerSize,
        }}
      />
      <View
        className="absolute rounded-bl-xl border-b-4 border-l-4 border-white opacity-40"
        style={{
          height: cornerSize,
          marginLeft: hudMargin,
          marginTop: props.viewfinderSize - (hudMargin + cornerSize),
          width: cornerSize,
        }}
      />
      <View
        className="absolute rounded-br-xl border-r-4 border-b-4 border-white opacity-40"
        style={{
          height: cornerSize,
          marginLeft: props.viewfinderSize - (hudMargin + cornerSize),
          marginTop: props.viewfinderSize - (hudMargin + cornerSize),
          width: cornerSize,
        }}
      />
    </>
  );
};
