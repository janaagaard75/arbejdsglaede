import { View } from "react-native";
import { HeartIcon } from "../iconsRow/HeartIcon";
import { HeartOutlineIcon } from "../iconsRow/HeartOutlineIcon";
import { IconsRow } from "../iconsRow/IconsRow";
import { SmileyIcon } from "../iconsRow/SmileyIcon";
import { SmileyOutlineIcon } from "../iconsRow/SmileyOutlineIcon";
import { BigSmiley } from "../smiley/BigSmiley";

interface Props {
  flames: number;
  hearts: number;
  percentage: number;
}

export const Summary = (props: Props) => (
  <View className="flex-1 justify-center">
    <View className="items-center">
      <View className="w-20">
        <BigSmiley percentage={props.percentage} />
      </View>
      <View className="h-1.25" />
      <IconsRow
        currentValue={props.hearts}
        excludedIcon={<SmileyOutlineIcon />}
        gap={1}
        includedIcon={<SmileyIcon />}
        maximum={10}
        size={12}
      />
      <View className="h-1.25" />
      <IconsRow
        currentValue={props.flames}
        excludedIcon={<HeartOutlineIcon />}
        gap={1}
        includedIcon={<HeartIcon />}
        maximum={10}
        size={12}
      />
    </View>
  </View>
);
