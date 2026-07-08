import { clsx } from "clsx";
import { View, type ViewProps } from "react-native";

type Props = ViewProps;

export const ThemedView = ({ className, ...otherProps }: Props) => {
  return (
    <View
      className={clsx("bg-zinc-100 dark:bg-zinc-900", className)}
      {...otherProps}
    />
  );
};
