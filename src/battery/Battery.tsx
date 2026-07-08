import { View } from "react-native";
import { BatteryIcon } from "./BatteryIcon";

interface Props {
  percentage: number;
}

export const Battery = (props: Props) => {
  const roundedPercentage = Math.round(props.percentage);

  const batteryColor = (() => {
    if (roundedPercentage <= 10) {
      return "red";
    }

    if (roundedPercentage <= 20) {
      return "orange";
    }

    return "green";
  })();

  return (
    <View className="aspect-[1.5] w-[60%]">
      <BatteryIcon
        color={batteryColor}
        percentage={roundedPercentage}
      />
    </View>
  );
};
