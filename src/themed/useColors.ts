import { colors } from "./colors";
import { useAppColorScheme } from "./useAppColorScheme";

export const useColors = () => {
  const theme = useAppColorScheme();
  return colors[theme];
};
