import { View } from "react-native";
import { BigSmiley } from "../smiley/BigSmiley";
import { ThemedText } from "../themed/ThemedText";

interface Props {
  percentage: number;
}

export const SmileyAndPercentage = (props: Props) => (
  <View className="items-center">
    <BigSmiley percentage={props.percentage} />
    <ThemedText className="text-[28px] font-bold">{`${props.percentage}%`}</ThemedText>
  </View>
);
