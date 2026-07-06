import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColors } from "../colors/useColors";
import "../global.css";
import { HeaderCloseButton } from "../HeaderCloseButton";
import { useColorScheme } from "../useColorScheme";

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const colors = useColors();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <SafeAreaProvider>
          <Stack
            screenOptions={{
              headerShadowVisible: false,
              headerShown: true,
              headerStyle: {
                backgroundColor: colors.background,
              },
            }}
          >
            <Stack.Screen
              name="index"
              options={{
                headerShown: false,
                headerTitle: "Forsiden",
              }}
            />
            <Stack.Screen
              name="reset"
              options={{
                gestureEnabled: false,
                headerRight: () => <HeaderCloseButton />,
                headerTitle: "Nulstil",
                presentation: "modal",
              }}
            />
            <Stack.Screen
              name="scan"
              options={{
                gestureEnabled: false,
                headerRight: () => <HeaderCloseButton />,
                headerTitle: "Scan QR-kode",
                presentation: "modal",
              }}
            />
          </Stack>
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
