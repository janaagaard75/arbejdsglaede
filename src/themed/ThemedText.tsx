import { Text, type TextProps } from "react-native";
import { cn } from "../cn";

type Props = TextProps & { children: string };

export const ThemedText = ({ children, className, ...otherProps }: Props) => {
  return (
    <Text
      className={cn(
        "text-[20px] leading-[30px] text-zinc-800 dark:text-zinc-200",
        className,
      )}
      {...otherProps}
    >
      {children}
    </Text>
  );
};
