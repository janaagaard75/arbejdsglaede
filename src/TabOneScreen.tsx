import { observer } from "mobx-react-lite";
import { Pressable, Text, View } from "react-native";
import { QrCode } from "./mainState/QrCode";
import { mainStore } from "./mainState/MainStore";

interface ButtonProps {
  onPress: () => void;
  title: string;
}

const Button = (props: ButtonProps) => {
  return (
    <Pressable
      className="rounded-lg bg-blue-600 px-4 py-2 active:bg-blue-700"
      onPress={props.onPress}
    >
      <Text className="font-semibold text-white">{props.title}</Text>
    </Pressable>
  );
};

const qrCodes: Record<string, QrCode> = {
  addFlame: { amount: 1, type: "flame" },
  addHeart: { amount: 1, type: "heart" },
  addPercentage: { amount: 10, type: "percentage" },
  removeFlame: { amount: -1, type: "flame" },
  removeHeart: { amount: -1, type: "heart" },
  removePercentage: { amount: -10, type: "percentage" },
};

export const TabOneScreen = observer(() => {
  return (
    <View className="flex-1 items-center justify-center gap-4">
      <Text className="text-4xl font-bold">{mainStore.score}</Text>
      <Text className="text-lg">
        {mainStore.percentage}% · {mainStore.hearts} ♥ · {mainStore.flames} 🔥
      </Text>
      <View className="flex-row gap-2">
        <Button
          onPress={() => mainStore.applyQrCode(qrCodes.addPercentage)}
          title="+10%"
        />
        <Button
          onPress={() => mainStore.applyQrCode(qrCodes.removePercentage)}
          title="-10%"
        />
      </View>
      <View className="flex-row gap-2">
        <Button
          onPress={() => mainStore.applyQrCode(qrCodes.addHeart)}
          title="+♥"
        />
        <Button
          onPress={() => mainStore.applyQrCode(qrCodes.removeHeart)}
          title="-♥"
        />
        <Button
          onPress={() => mainStore.applyQrCode(qrCodes.addFlame)}
          title="+🔥"
        />
        <Button
          onPress={() => mainStore.applyQrCode(qrCodes.removeFlame)}
          title="-🔥"
        />
      </View>
      <Button
        onPress={() => mainStore.reset()}
        title="Reset"
      />
    </View>
  );
});
