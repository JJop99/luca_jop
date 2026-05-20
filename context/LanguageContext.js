import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('it');

  // Restore persisted language on first mount (localStorage is browser-only)
  useEffect(() => {
    const saved = localStorage.getItem('lang');
    if (saved === 'it' || saved === 'en') setLanguage(saved);
  }, []);

  const handleSetLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('lang', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
