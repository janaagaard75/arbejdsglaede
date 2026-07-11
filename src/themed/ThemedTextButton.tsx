import { Pressable, type PressableProps } from "react-native";
import { ThemedText } from "./ThemedText";

interface Props {
  children: string;
  onPress: PressableProps["onPress"];
}

export const ThemedTextButton = (props: Props) => (
  <Pressable
    className="self-center rounded-lg border-2 border-zinc-800 px-4 py-1 dark:border-zinc-200"
    onPress={props.onPress}
  >
    <ThemedText>{props.children}</ThemedText>
  </Pressable>
);
