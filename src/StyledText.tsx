import { ComponentProps } from "react";
import { Text } from "react-native";

export const MonoText = (props: ComponentProps<typeof Text>) => {
  return (
    <Text
      {...props}
      className={`font-[SpaceMono] ${props.className ?? ""}`}
    />
  );
};
