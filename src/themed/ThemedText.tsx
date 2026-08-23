import { Text, type TextProps } from "react-native";
import { cn } from "../cn";
import { useColors } from "./useColors";

type Props = TextProps & { children: string };

export const ThemedText = ({ className, style, ...otherProps }: Props) => {
  const colors = useColors();

  return (
    <Text
      className={cn("text-[20px] leading-7.5", className)}
      style={[{ color: colors.text }, style]}
      {...otherProps}
    />
  );
};
