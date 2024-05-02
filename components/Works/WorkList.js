import { Fragment } from "react";
import WorkItem from "./WorkItem";
import classes from "./WorkList.module.sass";

function WorkList(props) {
  return (
    <Fragment>
      <ul className={classes["list__ul--margin"]}>
        {props.works.map(
          (work) => (
            console.log(work),
            (
              <WorkItem
                key={work.id}
                id={work.id}
                image={work.images[0].image}
                title={work.title}
                shortDescription={work.shortDescription}
                description={work.description}
              />
            )
          )
        )}
      </ul>
    </Fragment>
  );
}

export default WorkList;
