import { useColorScheme } from "react-native";

export const useAppColorScheme = () => {
  const coreScheme = useColorScheme();
  return coreScheme === "unspecified" ? "light" : coreScheme;
};
