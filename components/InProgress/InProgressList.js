import { Fragment } from "react";
import InProgressItem from "./InProgressItem";
import classes from "./InProgressList.module.sass";

function InProgressList(props) {
  return (
    <Fragment>
      <ul className={classes["list__ul--margin"]}>
        {props.inProgress.map(
          (inProgress) => (
            console.log(inProgress),
            (
              <InProgressItem
                key={inProgress.id}
                id={inProgress.id}
                image={inProgress.image}
                title={inProgress.title}
                shortDescription={inProgress.shortDescription}
              />
            )
          )
        )}
      </ul>
    </Fragment>
  );
}

export default InProgressList;
