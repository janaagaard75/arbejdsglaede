import { ExpoConfig } from "expo/config";

const applicationIdentifier = "com.henrikleth.arbejdsglaede";

const config: ExpoConfig = {
  name: "arbejdsglaede",
  slug: "arbejdsglaede",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "arbejdsglaede",
  userInterfaceStyle: "automatic",
  ios: {
    bundleIdentifier: applicationIdentifier,
    infoPlist: {
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
  plugins: [
    [
      "expo-camera",
      {
        cameraPermission:
          "App'en har brug for adgang til kameraet for at kunne scanne QR-koderne i spillet.",
        recordAudioAndroid: false,
      },
    ],
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
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
