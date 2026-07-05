import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColors } from "../colors/useColors";
import "../global.css";
import { useColorScheme } from "../useColorScheme";

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const colors = useColors();

  return (
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
              headerTitle: "Nulstil",
            }}
          />
          <Stack.Screen
            name="scan"
            options={{
              headerTitle: "Scan QR-kode",
            }}
          />
        </Stack>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default RootLayout;
