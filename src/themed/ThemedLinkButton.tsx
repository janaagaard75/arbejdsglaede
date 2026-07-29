import { Link, type LinkProps } from "expo-router";
import { ThemedText } from "./ThemedText";
import { useColors } from "./useColors";

interface Props {
  children: string;
  href: LinkProps["href"];
}

export const ThemedLinkButton = (props: Props) => {
  const colors = useColors();

  return (
    <Link
      className="self-center rounded-lg border-2 px-4 py-1"
      href={props.href}
      style={{ borderColor: colors.text }}
    >
      <ThemedText>{props.children}</ThemedText>
    </Link>
  );
};
