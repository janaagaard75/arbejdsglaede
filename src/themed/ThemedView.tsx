import { View, type ViewProps } from "react-native";
import { cn } from "../cn";

type Props = ViewProps;

export const ThemedView = ({ className, ...otherProps }: Props) => {
  return (
    <View
      className={cn("bg-zinc-100 dark:bg-zinc-900", className)}
      {...otherProps}
    />
  );
};
