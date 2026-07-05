import { type RefAttributes } from "react";
import { Pressable, View, type PressableProps } from "react-native";
import { cn } from "../cn";
import { ThemedText } from "./ThemedText";

type Props = PressableProps & RefAttributes<View> & { children: string };

export const ThemedTextButton = ({
  children,
  className,
  ...otherProps
}: Props) => {
  return (
    <Pressable
      className={cn(
        "self-center rounded-lg border-2 border-zinc-800 px-4 py-1 dark:border-zinc-200",
        className,
      )}
      {...otherProps}
    >
      <ThemedText>{children}</ThemedText>
    </Pressable>
  );
};
