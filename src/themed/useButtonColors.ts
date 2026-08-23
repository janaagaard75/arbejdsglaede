import { useColors } from "./useColors";

export type ButtonVariant = "primary" | "secondary";

/** The primary variant is filled in the text color and the secondary one an outline of it. Red is reserved for the hearts and the low battery, so it is not used here. */
export const useButtonColors = (variant: ButtonVariant) => {
  const colors = useColors();

  return variant === "primary"
    ? {
        background: colors.text,
        border: colors.text,
        label: colors.background,
      }
    : {
        background: "transparent",
        border: colors.text,
        label: colors.text,
      };
};
