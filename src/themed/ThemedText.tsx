import { clsx } from "clsx";
import { Text, type TextProps } from "react-native";

type Props = TextProps & { children: string };

export const ThemedText = ({ className, ...otherProps }: Props) => (
  <Text
    className={clsx(
      "text-[20px] leading-7.5 text-zinc-800 dark:text-zinc-200",
      className,
    )}
    {...otherProps}
  />
);
