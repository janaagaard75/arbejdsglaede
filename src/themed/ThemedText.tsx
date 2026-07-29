import { Text, type TextProps } from "react-native";
import { cn } from "../cn";

type Props = TextProps & { children: string };

export const ThemedText = ({ className, ...otherProps }: Props) => (
  <Text
    className={cn(
      "text-[20px] leading-7.5 text-zinc-800 dark:text-zinc-200",
      className,
    )}
    {...otherProps}
  />
);
