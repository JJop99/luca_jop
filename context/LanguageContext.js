import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();


export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('it'); // Imposta 'it' come lingua di default

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  console.log("useLanguage context:", context); // Aggiungi questo per vedere cosa viene restituito

  return context;
};
