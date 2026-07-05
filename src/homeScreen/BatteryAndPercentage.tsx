import { View } from "react-native";
import { Battery } from "../battery/Battery";
import { ThemedText } from "../themed/ThemedText";

export const BatteryAndPercentage = ({
  percentage,
}: {
  percentage: number;
}) => (
  <View className="items-center">
    <Battery percentage={percentage} />
    <ThemedText className="text-[28px] font-bold">{`${percentage}%`}</ThemedText>
  </View>
);
