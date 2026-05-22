import { Text } from "react-native";
import { ComponentProps } from "react";

export const MonoText = (props: ComponentProps<typeof Text>) => {
  return <Text {...props} className={`font-[SpaceMono] ${props.className ?? ""}`} />;
};
