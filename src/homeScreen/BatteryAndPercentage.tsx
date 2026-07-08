import { View } from "react-native";
import { Battery } from "../battery/Battery";
import { ThemedText } from "../themed/ThemedText";

interface Props {
  percentage: number;
}

export const BatteryAndPercentage = (props: Props) => (
  <View className="items-center">
    <Battery percentage={props.percentage} />
    <ThemedText className="text-[28px] font-bold">{`${props.percentage}%`}</ThemedText>
  </View>
);
