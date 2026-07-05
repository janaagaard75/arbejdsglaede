import { Text, View } from "react-native";

export const ScannerScreen = () => {
  return (
    <View className="flex-1 items-center justify-center bg-zinc-100 dark:bg-zinc-900">
      <Text className="text-zinc-800 dark:text-zinc-200">Scan QR-kode</Text>
    </View>
  );
};
