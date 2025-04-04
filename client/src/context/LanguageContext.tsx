import { createContext, useState, useContext, ReactNode } from "react";
import enTranslations from "../lib/i18n/en";
import itTranslations from "../lib/i18n/it";

type Language = "en" | "it";
type Translations = typeof enTranslations;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof Translations | string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const translations: Record<Language, Translations> = {
    en: enTranslations,
    it: itTranslations,
  };

  const t = (key: keyof Translations | string): string => {
    return translations[language][key as keyof Translations] || 
           translations.en[key as keyof Translations] || 
           String(key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
