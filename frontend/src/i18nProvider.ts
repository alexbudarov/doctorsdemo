import { TranslationMessages } from "ra-core";
import polyglotI18nProvider from "ra-i18n-polyglot";
import { en } from "./core/i18n/messages/en";
import { ru } from "./core/i18n/messages/ru";

const translations: Record<string, TranslationMessages> = {
  en,
  ru,
};

export const i18nProvider = polyglotI18nProvider(
  (locale) => translations[locale],
  "en", // default locale
  [
    { locale: "en", name: "English" },
    { locale: "ru", name: "Русский" },
  ]
);
