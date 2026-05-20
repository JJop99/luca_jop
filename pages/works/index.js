import Head from "next/head";
import { MongoClient } from "mongodb";
import { Fragment } from "react";
import WorkList from "../../components/Works/WorkList";
//import image from "/public/work.jpg"

function Works(props) {
  return (
    <Fragment>
      <Head>
        <title>Luca Jop — Lavori</title>
        <meta name="description" content="Progetti di architettura: residenze, edifici pubblici, impianti sportivi e riqualificazione energetica." />
      </Head>
      <div className="page-fade-in">
        <WorkList works={props.works} />
      </div>
    </Fragment>
  );
}



export async function getStaticProps() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();

  const worksCollection = db.collection("works");

  const works = await worksCollection.find().sort({ year: -1 }).toArray();

  client.close();
  return {
    props: {
      works: works.map((work) => ({
        title: work.title,
        images: JSON.parse(JSON.stringify(work.images)),
        shortDescription:work.shortDescription,
        id: work._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default Works;
