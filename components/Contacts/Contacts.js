import Image from "next/image";
import classes from "./Contacts.module.sass";

const Contacts = () => {
  return (
    <div className={classes["item--positions"]}>
      <Image 
        src="/IMG_2922.jpg" 
        className={classes.img} 
        alt="Luca Jop"  
        width={800}  // Aspect ratio width
        height={600} // Aspect ratio height
        priority
      />
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
