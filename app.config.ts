import { ExpoConfig } from "expo/config";

const applicationIdentifier = "com.henrikleth.arbejdsglaede";

const config: ExpoConfig = {
  name: "Happiness at work",
  slug: "arbejdsglaede",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon-light.png",
  scheme: "arbejdsglaede",
  userInterfaceStyle: "automatic",
  ios: {
    bundleIdentifier: applicationIdentifier,
    icon: {
      dark: "./assets/icon-dark.png",
      light: "./assets/icon-light.png",
      // The white-on-black icon doubles as the grayscale mask that iOS tints.
      tinted: "./assets/icon-dark.png",
    },
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
      ITSAppUsesNonExemptEncryption: false,
    },
    supportsTablet: false,
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#ffffff",
      // The glyph is padded to sit inside the 66dp safe zone, so the same black-on-transparent file works as both layers.
      foregroundImage: "./assets/android-icon.png",
      monochromeImage: "./assets/android-icon.png",
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
    da: "./locales/appMetadata.da.json",
    en: "./locales/appMetadata.en.json",
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
        image: "./assets/splash-icon-light.png",
        // The default of 100 leaves the wide battery glyph too small to read.
        imageWidth: 200,
        resizeMode: "contain",
        // These repeat Colors.light.background and Colors.dark.background. Expo's config loader requires this file through plain Node, which cannot resolve an import of a TypeScript module.
        backgroundColor: "#f4f4f5",
        dark: {
          backgroundColor: "#18181b",
          image: "./assets/splash-icon-dark.png",
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
