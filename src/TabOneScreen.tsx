import { View, Text } from "react-native";
import { EditScreenInfo } from "./EditScreenInfo";

export const TabOneScreen = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl font-bold">Tab One</Text>
      <View className="my-7.5 h-px w-4/5 bg-[#eee] dark:bg-white/10" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
};
