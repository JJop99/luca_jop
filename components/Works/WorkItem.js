import { useRouter } from "next/router";
import { useState } from 'react';

import Card from "../UI/Card";
import classes from "./WorkItem.module.sass";
import Image from "next/image";



function WorkItem(props) {
  const router = useRouter();
  const showDetailsHandler = () => {
    router.push("/" + props.id);
  };

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const handleImageLoad = (event) => {
    const { width, height } = event.target;
    setDimensions({ width, height });
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
            src={"/"+props.image}
            className={classes.img}
            alt={props.title}
            width={dimensions.width || 0}
            height={dimensions.height || 0}
            layout="intrinsic" // or "responsive" depending on your needs
            onLoad={handleImageLoad}
          ></Image>
        </div>
      </Card>
    </li>
  );
}

export default WorkItem;
