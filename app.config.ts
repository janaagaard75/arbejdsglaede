import { ExpoConfig } from "expo/config";

const applicationIdentifier = "com.henrikleth.arbejdsglaede";

const config: ExpoConfig = {
  name: "Arbejdsglaede",
  slug: "arbejdsglaede",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "arbejdsglaede",
  userInterfaceStyle: "automatic",
  ios: {
    bundleIdentifier: applicationIdentifier,
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
      ITSAppUsesNonExemptEncryption: false,
    },
    supportsTablet: false,
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#E6F4FE",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png",
    },
    package: applicationIdentifier,
    predictiveBackGestureEnabled: false,
  },
  extra: {
    eas: {
      projectId: "30be4b8d-e596-4e43-8a03-767511bb7cae",
    },
  },
  locales: {
    da: "./locales/da.json",
    en: "./locales/en.json",
  },
  plugins: [
    [
      "expo-camera",
      {
        // The fallback used when the device language is neither Danish nor English. The localized versions live in ./locales.
        cameraPermission:
          "The app needs access to the camera to scan the QR codes in the game.",
        recordAudioAndroid: false,
      },
    ],
    [
      "expo-localization",
      {
        // Apply language without requiring a cold start.
        allowDynamicLocaleChangesAndroid: false,
        supportedLocales: ["da", "en"],
      },
    ],
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        resizeMode: "contain",
        // These repeat Colors.light.background and Colors.dark.background. Expo's config loader requires this file through plain Node, which cannot resolve an import of a TypeScript module.
        backgroundColor: "#f4f4f5",
        dark: {
          backgroundColor: "#18181b",
        },
      },
    ],
  ],
  experiments: {
    reactCompiler: true,
    typedRoutes: true,
  },
  updates: {
    url: "https://u.expo.dev/30be4b8d-e596-4e43-8a03-767511bb7cae",
  },
  runtimeVersion: {
    policy: "fingerprint",
  },
};

export default config;
