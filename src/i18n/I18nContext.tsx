import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translate, TranslationKey } from './index';
import { loadLanguage, saveLanguage } from '../utils/storage';
import { en } from './locales/en';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
  t: (key: TranslationKey) => string;
  getAvailableLanguages: () => { code: Language; name: string }[];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [isReady, setIsReady] = useState(false);

  // Load language from storage on mount
  useEffect(() => {
    const initLanguage = async () => {
      try {
        const savedLanguage = await loadLanguage();
        const lang = savedLanguage || 'en';
        setLanguageState(lang);
        setIsReady(true);
      } catch (error) {
        console.error('Failed to load language:', error);
        setLanguageState('en');
        setIsReady(true);
      }
    };
    initLanguage();
  }, []);

  const changeLanguage = async (lang: Language) => {
    try {
      setLanguageState(lang);
      await saveLanguage(lang);
    } catch (error) {
      console.error('Failed to save language:', error);
    }
  };

  const t = React.useCallback((key: TranslationKey): string => {
    return translate(language, key);
  }, [language]);
  
  const getAvailableLanguages = React.useCallback((): { code: Language; name: string }[] => {
    return [
      { code: 'en', name: translate(language, 'english') },
      { code: 'ja', name: translate(language, 'japanese') },
    ];
  }, [language]);

  if (!isReady) {
    return null; // Or a loading spinner
  }

  return (
    <I18nContext.Provider value={{ language, setLanguage: changeLanguage, t, getAvailableLanguages }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
};
