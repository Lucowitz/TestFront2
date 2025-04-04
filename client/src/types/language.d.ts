import enTranslations from '../lib/i18n/en';

// This file declares the types for our language/internationalization system

type TranslationKeys = keyof typeof enTranslations;

declare module '@/hooks/useLanguage' {
  export type Language = 'en' | 'it';
  export type Translations = typeof enTranslations;
  
  export interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    t: (key: TranslationKeys | string) => string;
  }
  
  export function useLanguage(): LanguageContextType;
}