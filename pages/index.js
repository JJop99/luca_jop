import Head from "next/head";
import BackgroundImage from "../components/UI/Image";

import classes from "../styles/Home.module.sass";


export default function Home() {
  
  return (
    <div className={classes.container}>
      <Head>
        <title>Luca Jop</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BackgroundImage
        style="z-index: -1"
        className={classes.landingImage}
        src="/Home-01.jpg"
        alt="Image description"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      
    </div>
  );
}
