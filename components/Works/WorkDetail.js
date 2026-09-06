
import Carousel from "../UI/Carousel";
import classes from "./WorkDetail.module.sass";
import LanguageSelector from "../../components/Language/LanguageSelector"; // Importa il selettore


const WorkDetail = (props) => {
  return (
    <div>
      <div className={classes.caption}>
        <h1 className={classes["title--style"]}>{props.title}</h1>
        <p className={classes["shortDescription--style"]}>
          {props.shortDescription}
        </p>
       

      </div>
      <div className={classes["item--positions"]}>
        <div className={classes.carousel}>
          <Carousel images={props.images}/>
        </div>
        <div className={classes.description}>
          {/* <span className={classes.role}>{props.role}</span> */}
          {props.description.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkDetail;
