import { Link } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import { ComponentProps } from "react";

export const ExternalLink = (
  props: Omit<ComponentProps<typeof Link>, "href"> & { href: string },
) => {
  return (
    <Link
      target="_blank"
      {...props}
      // @ts-expect-error: We are abusing the link component here to link to external URLs which do of course not match any of the internal routes of the app.
      href={props.href}
      onPress={(e) => {
        // Prevent the default behavior of linking to the default browser on native.
        e.preventDefault();
        // Open the link in an in-app browser.
        openBrowserAsync(props.href as string);
      }}
    />
  );
};
