import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";
import "../global.css";
import { useColorScheme } from "../useColorScheme";

const RootLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShadowVisible: false,
            headerShown: true,
            headerStyle: {
              backgroundColor:
                colorScheme === "dark" ? colors.zinc[900] : colors.zinc[100],
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
