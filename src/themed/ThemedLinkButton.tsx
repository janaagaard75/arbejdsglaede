import { Link, type LinkProps } from "expo-router";
import { cn } from "../cn";
import { ThemedText } from "./ThemedText";

type Props = LinkProps & { children: string };

export const ThemedLinkButton = ({
  children,
  className,
  href,
  ...otherProps
}: Props) => {
  return (
    <Link
      className={cn(
        "self-center rounded-lg border-2 border-zinc-800 px-4 py-1 dark:border-zinc-200",
        className,
      )}
      href={href}
      {...otherProps}
    >
      <ThemedText>{children}</ThemedText>
    </Link>
  );
};
