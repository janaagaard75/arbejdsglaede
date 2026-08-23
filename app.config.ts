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
      // A file of its own, because iOS tints the grayscale of whatever it is given, and the orange glyph flattens to a middle gray.
      tinted: "./assets/icon-tinted.png",
    },
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
      ITSAppUsesNonExemptEncryption: false,
    },
    supportsTablet: false,
  },
  android: {
    adaptiveIcon: {
      // This repeats colors.light.background, for the same reason the splash screen colors below do.
      backgroundColor: "#f8f4ee",
      // The glyph is padded to sit inside the 66dp safe zone, and Android tints the monochrome layer through its alpha alone, so one file serves both layers.
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
        // The default of 100 shrinks the smiley so far that its eyes and fill line stop reading.
        imageWidth: 200,
        resizeMode: "contain",
        // These repeat colors.light.background and colors.dark.background. Expo's config loader requires this file through plain Node, which cannot resolve an import of a TypeScript module.
        backgroundColor: "#f8f4ee",
        dark: {
          backgroundColor: "#292929",
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
