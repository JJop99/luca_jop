import BackgroundImage from "../components/UI/Image";

import classes from "../styles/Home.module.sass";


export default function Home() {
  
  return (
    <div className={classes.container}>
      

      <BackgroundImage
        style="z-index: -1"
        className={classes.landingImage}
        src="/Home-01-scaled.jpg"
        alt="Image description"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      
    </div>
  );
}
