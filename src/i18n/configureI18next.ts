import { getLocales } from "expo-localization";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import translationDa from "./translations/da.json";
import translationEn from "./translations/en.json";

const defaultLanguage = "en";

export const configureI18next = async () => {
  if (i18next.isInitialized) {
    return;
  }

  // We prioritize the system language to follow the OS settings.
  const selectedLanguage = getLocales()[0].languageTag;

  await i18next.use(initReactI18next).init({
    fallbackLng: {
      da: ["da"],
      "da-DK": ["da"],
      default: [defaultLanguage],
    },
    interpolation: {
      escapeValue: false,
    },
    lng: selectedLanguage,
    resources: {
      da: {
        // `satisfies` tp ensures that the Danish translation has the same keys as the English translation.
        translation: translationDa satisfies typeof translationEn,
      },
      en: {
        translation: translationEn,
      },
    },
  });
};
