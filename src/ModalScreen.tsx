import { StatusBar } from "expo-status-bar";
import { Platform, Text, View } from "react-native";
import { EditScreenInfo } from "./EditScreenInfo";

export const ModalScreen = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl font-bold">Modal</Text>
      <View className="my-7.5 h-px w-4/5 bg-[#eee] dark:bg-white/10" />
      <EditScreenInfo path="app/modal.tsx" />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};
