
import Card from "../UI/Card";
import classes from "./InProgressItem.module.sass";

function InProgressItem(props) {

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes["item--positions"]}>
          <div className={classes.caption}>
            <div className={classes["title--style"]}>{props.title}</div>
            <p className={classes["shortDescription--style"]}>
              {props.shortDescription}
            </p>
          </div>
          <img
            src={props.image}
            className={classes.img}
            alt={props.title}
          ></img>
        </div>
      </Card>
    </li>
  );
}

export default InProgressItem;
