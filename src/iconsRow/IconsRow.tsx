import { ReactNode } from "react";
import { View } from "react-native";

interface Props {
  currentValue: number;
  excludedIcon: ReactNode;
  gap: number;
  includedIcon: ReactNode;
  maximum: number;
  size: number;
}

export const IconsRow = (props: Props) => (
  <View
    className="flex-row self-center"
    style={{ gap: props.gap }}
  >
    {Array.from({ length: props.maximum }).map((_, index) => (
      <View
        key={index}
        style={{
          height: props.size,
          width: props.size,
        }}
      >
        {index < props.currentValue ? props.includedIcon : props.excludedIcon}
      </View>
    ))}
  </View>
);
