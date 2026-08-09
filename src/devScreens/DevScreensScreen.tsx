import { Stack } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { devScreens } from "./devScreens";
import { DevScreensNavigation } from "./DevScreensNavigation";

export const DevScreensScreen = () => {
  const [index, setIndex] = useState(0);

  const devScreen = devScreens[index];

  const step = (offset: number) => {
    setIndex(
      (currentIndex) =>
        (currentIndex + offset + devScreens.length) % devScreens.length,
    );
  };

  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          headerRight: () => (
            <DevScreensNavigation
              current={index + 1}
              onNext={() => step(1)}
              onPrevious={() => step(-1)}
              total={devScreens.length}
            />
          ),
          headerTitle: devScreen.name,
        }}
      />
      <View
        className="flex-1"
        key={devScreen.name}
      >
        {devScreen.screen}
      </View>
    </View>
  );
};
