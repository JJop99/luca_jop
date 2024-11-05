import { useLanguage } from '../../context/LanguageContext';
import classes from './LanguageSelector.module.sass';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage(); // Ottieni la lingua dal contesto

  console.log("Lingua corrente:", language); // Controlla se il valore cambia

  return (
    <div className={classes.languageSelector}>
      <button
        className={`${classes.button} ${language === 'it' ? classes.active : classes.inactive}`}
        onClick={() => setLanguage('it')}
      >
        Ita
      </button>
      <button
        className={`${classes.button} ${language === 'en' ? classes.active : classes.inactive}`}
        onClick={() => setLanguage('en')}
      >
        Eng
      </button>
    </div>
  );
};

export default LanguageSelector;
