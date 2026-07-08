import { useAppColorScheme } from "../useAppColorScheme";
import { Colors } from "./Colors";

export const useColors = () => {
  const theme = useAppColorScheme();
  return Colors[theme];
};
