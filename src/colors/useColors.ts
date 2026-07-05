import { useColorScheme } from "../useColorScheme";
import { Colors } from "./Colors";

export const useColors = () => {
  const theme = useColorScheme();
  return Colors[theme];
};
