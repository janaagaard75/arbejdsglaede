import { Href, Link } from "expo-router";
import { ComponentProps } from "react";

export const ExternalLink = (
  props: Omit<ComponentProps<typeof Link>, "href"> & { href: Href },
) => {
  return <Link target="_blank" {...props} href={props.href} />;
};
