import { useRouter } from "next/router";

import Card from "../UI/Card";
import classes from "./WorkItem.module.sass";
import Image from "next/image";

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
          <Image
            src={props.image}
            className={classes.img}
            alt={props.title}
          ></Image>
        </div>
      </Card>
    </li>
  );
}

export default WorkItem;
