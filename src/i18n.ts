import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/translation.json";
import fr from "./locales/fr/translation.json";
import es from "./locales/es/translation.json";
import it from "./locales/it/translation.json";
import ar from "./locales/ar/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      es: { translation: es },
      it: { translation: it },
      ar: { translation: ar },
    },
    lng: "en", // 👈 Force default language to English
    fallbackLng: "en", // 👈 If detection fails, fallback to English
    interpolation: {
      escapeValue: false,
    },
    detection: {
      // Optional: customize how language is detected
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
  });

export default i18n;
