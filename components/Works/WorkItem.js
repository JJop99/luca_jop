import { useRouter } from "next/router";

import Card from "../ui/Card";
import classes from "./WorkItem.module.sass";

function WorkItem(props) {
  const router = useRouter();
  const showDetailsHandler = () => {
    router.push("/" + props.id);
  };

  return (
    <li className={classes.item} onClick={showDetailsHandler}>
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

export default WorkItem;
