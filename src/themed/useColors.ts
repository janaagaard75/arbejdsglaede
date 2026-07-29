import { useAppColorScheme } from "../useAppColorScheme";
import { colors } from "./colors";

export const useColors = () => {
  const theme = useAppColorScheme();
  return colors[theme];
};
