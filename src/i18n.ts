import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import sv from "./locales/sv/translation.json";
import en from "./locales/en/translation.json";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            sv: { translation: sv },
            en: { translation: en },
        },
        fallbackLng: "sv",


        detection: {
            order: ["localStorage", "querystring", "cookie", "navigator", "htmlTag"],
            caches: ["localStorage", "cookie"],
        },

        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
