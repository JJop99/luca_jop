
import Carousel from "../UI/Carousel";
import classes from "./WorkDetail.module.sass";

const WorkDetail = (props) => {
  console.log(props);

  return (
    <div>
      <div className={classes.caption}>
        <div className={classes["title--style"]}>{props.title}</div>
        <p className={classes["shortDescription--style"]}>
          {props.shortDescription}
        </p>
      </div>
      <div className={classes["item--positions"]}>
        <div className={classes.carousel}>
          <Carousel images={props.images}/>
        </div>
        <div className={classes.description}>
          {props.description}
        </div>
      </div>
    </div>
  );
};

export default WorkDetail;
