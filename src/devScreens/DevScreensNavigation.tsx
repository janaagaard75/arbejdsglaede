import { Pressable, View } from "react-native";
import { ThemedText } from "../themed/ThemedText";

interface Props {
  readonly current: number;
  readonly onNext: () => void;
  readonly onPrevious: () => void;
  readonly total: number;
}

export const DevScreensNavigation = (props: Props) => (
  <View className="flex-row items-center gap-2 px-2">
    <Pressable
      hitSlop={10}
      onPress={props.onPrevious}
    >
      <ThemedText className="text-[16px]">{"\u2039"}</ThemedText>
    </Pressable>
    <ThemedText className="text-[16px]">{`${props.current} / ${props.total}`}</ThemedText>
    <Pressable
      hitSlop={10}
      onPress={props.onNext}
    >
      <ThemedText className="text-[16px]">{"\u203A"}</ThemedText>
    </Pressable>
  </View>
);
