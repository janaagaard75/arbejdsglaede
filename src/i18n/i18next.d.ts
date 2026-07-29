import "i18next";
import uiStringsEn from "./translations/uiStrings.en.json";

// Typing the resources makes the keys passed to `t` autocomplete and turns both unknown keys and missing interpolation values into compile errors.
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: typeof uiStringsEn;
    };
  }
}
