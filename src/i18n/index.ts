import { en } from './locales/en';
import { ja } from './locales/ja';

export type Language = 'en' | 'ja';
export type TranslationKey = keyof typeof en;

const translations = {
  en,
  ja,
};

/**
 * Translate a key for a specific language
 * This is the single source of truth for translations
 */
export const translate = (lang: Language, key: TranslationKey): string => {
  return translations[lang][key] ?? translations.en[key] ?? key;
};
