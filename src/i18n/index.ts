// Sets up English/Arabic translations.
//
// How the language is chosen:
// - Arabic needs the whole layout mirrored (right-to-left). React Native can only
//   flip the layout on app start, so switching language = forceRTL + reload.
// - forceRTL is saved natively, so after a reload I18nManager.isRTL tells us
//   which language the user picked. No extra storage needed.
// - On the very first launch isRTL follows the phone's language
//   (expo-localization `supportsRTL` in app.json).
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { I18nManager } from "react-native";
import { reloadAppAsync } from "expo";

import en from "./en.json";
import ar from "./ar.json";

export type Language = "en" | "ar";

export const currentLanguage = (): Language => (I18nManager.isRTL ? "ar" : "en");

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: currentLanguage(),
  fallbackLng: "en",
  interpolation: { escapeValue: false }, // React already escapes text
});

// Switch language and restart the app so the layout direction updates.
export async function setLanguage(language: Language) {
  if (language === currentLanguage()) return;
  const rtl = language === "ar";
  I18nManager.allowRTL(rtl);
  I18nManager.forceRTL(rtl);
  await reloadAppAsync();
}

export default i18n;
