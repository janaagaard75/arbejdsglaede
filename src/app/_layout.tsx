import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColors } from "../colors/useColors";
import "../global.css";
import { HeaderCloseButton } from "../HeaderCloseButton";
import { configureI18next } from "../i18n/configureI18next";
import { useAppColorScheme } from "../useAppColorScheme";

// The translations are bundled with the app, so i18next initializes synchronously and is ready before the first render.
void configureI18next();

const RootLayout = () => {
  const colorScheme = useAppColorScheme();
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
                headerRight: () => <HeaderCloseButton />,
                headerTitle: "Nulstil",
                presentation: "modal",
              }}
            />
            <Stack.Screen
              name="scan"
              options={{
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
