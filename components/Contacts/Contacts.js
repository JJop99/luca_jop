import classes from "./Contacts.module.sass";

const Contacts = () => {
  return (
    <div className={classes["item--positions"]}>
      <img src="IMG_2922.jpg" className={classes.img} alt="Luca Jop"></img>
      <div className={classes.caption}>
        <p className={classes.info}>
          Arch. Luca Jop
          <br />
          <br />
          Via Benazza 11
          <br />
          Bologna 40131
          <br />
          IT
          <br />
          &nbsp;
          <br />
          Telephone &nbsp;
          <br />
          +39 3358454554
          <br />
          &nbsp;
          <br />
          studio@lucajop.it
        </p>
      </div>
    </div>
  );
};

export default Contacts;
