import { useColorScheme } from "react-native";

export const useAppColorScheme = () => useColorScheme() ?? "light";
