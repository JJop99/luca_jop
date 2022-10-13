import { Fragment } from "react";
import Timeline from "./Timeline";
import classes from "./About.module.sass"

const About = () => {
  return (
    <Fragment>
      <div className={classes.caption}>
        <div className={classes["title--style"]}>Percorso</div>
        <p className={classes["shortDescription--style"]}>
          Nei vent’anni trascorsi, i lavori seguiti hanno abbracciato una ampia
          gamma di scale e tipologie di interventi, dalle residenze agli edifici
          pubblici, come asili o scuole, agli impianti sportivi. Nell’ultimo
          periodo il focus si è spostato principalmente sulla riqualificazione,
          in particolare energetica, degli edifici esistenti.
        </p>
      </div>
      <div className="justify-center flex ">
        <Timeline />
      </div>
      
    </Fragment>
  );
};

export default About;
