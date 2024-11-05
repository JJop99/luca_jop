import { Fragment } from "react";
import Timeline from "./Timeline";
import classes from "./About.module.sass"
import { useLanguage } from '../../context/LanguageContext';

const About = () => {
  const { language } = useLanguage();

  // Oggetto per le traduzioni
  const content = {
    it: {
      title: "Percorso",
      description: "Nei vent’anni trascorsi, i lavori seguiti hanno abbracciato una ampia gamma di scale e tipologie di interventi, dalle residenze agli edifici pubblici, come asili o scuole, agli impianti sportivi. Nell’ultimo periodo il focus si è spostato principalmente sulla riqualificazione, in particolare energetica, degli edifici esistenti."
    },
    en: {
      title: "Path",
      description: "Over the past twenty years, the projects undertaken have covered a wide range of scales and types of interventions, from residences to public buildings, such as kindergartens or schools, to sports facilities. Recently, the focus has shifted primarily to the redevelopment, particularly energy, of existing buildings."
    }
  };

  return (
    <Fragment>
      <div className={classes.caption}>
        <div className={classes["title--style"]}>{content[language].title}</div>
        <p className={classes["shortDescription--style"]}>
          {content[language].description}
        </p>
      </div>
      <div className="justify-center flex px-4">
        <Timeline />
      </div>
    </Fragment>
  );
};

export default About;

