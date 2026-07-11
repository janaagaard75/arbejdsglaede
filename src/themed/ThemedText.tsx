import { clsx } from "clsx";
import { Text, type TextProps } from "react-native";

type Props = TextProps & { children: string };

export const ThemedText = (props: Props) => (
  <Text
    className={clsx(
      "text-[20px] leading-[30px] text-zinc-800 dark:text-zinc-200",
      props.className,
    )}
    {...props}
  >
    {props.children}
  </Text>
);
