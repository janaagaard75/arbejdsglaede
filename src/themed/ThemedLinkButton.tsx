import { Link, type LinkProps } from "expo-router";
import { ThemedText } from "./ThemedText";

interface Props {
  children: string;
  href: LinkProps["href"];
}

export const ThemedLinkButton = (props: Props) => (
  <Link
    className="self-center rounded-lg border-2 border-zinc-800 px-4 py-1 dark:border-zinc-200"
    href={props.href}
  >
    <ThemedText>{props.children}</ThemedText>
  </Link>
);
