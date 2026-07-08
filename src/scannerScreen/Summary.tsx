import { View } from "react-native";
import { Battery } from "../battery/Battery";
import { FlameIcon } from "../iconsRow/FlameIcon";
import { FlameOutlineIcon } from "../iconsRow/FlameOutlineIcon";
import { HeartIcon } from "../iconsRow/HeartIcon";
import { HeartOutlineIcon } from "../iconsRow/HeartOutlineIcon";
import { IconsRow } from "../iconsRow/IconsRow";

interface Props {
  flames: number;
  hearts: number;
  percentage: number;
}

export const Summary = (props: Props) => (
  <View className="flex-1 justify-center">
    <View className="items-center">
      <View className="ml-5 w-20 content-center">
        <Battery percentage={props.percentage} />
      </View>
      <View className="h-1.25" />
      <IconsRow
        currentValue={props.flames}
        excludedIcon={<FlameOutlineIcon />}
        gap={1}
        includedIcon={<FlameIcon />}
        maximum={10}
        size={12}
      />
      <View className="h-1.25" />
      <IconsRow
        currentValue={props.hearts}
        excludedIcon={<HeartOutlineIcon />}
        gap={1}
        includedIcon={<HeartIcon />}
        maximum={10}
        size={12}
      />
    </View>
  </View>
);
