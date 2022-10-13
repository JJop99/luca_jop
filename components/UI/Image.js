import classes from "./Image.module.sass";
import Image from "next/image";


const BackgroundImage = (props) => {
  return (
    <div className={classes.backgroundImg}>
      <Image
        className={props.className}
        src={props.src}
        alt={props.alt}
        layout={props.layout}
        objectFit={props.objectFit}
        quality={props.quality}
      />
    </div>
  );
};

export default BackgroundImage;
