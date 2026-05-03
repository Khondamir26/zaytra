"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Language, translations } from "@/lib/i18n";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.EN;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: "EN",
  setLanguage: () => {},
  t: translations.EN,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("EN");
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
