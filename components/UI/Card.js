import classes from "./Card.module.sass";

const Card = (props) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default Card;
