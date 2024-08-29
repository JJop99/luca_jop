import Head from "next/head";
import { MongoClient } from "mongodb";
import { Fragment } from "react";
import WorkList from "../../components/Works/WorkList";
//import image from "/public/work.jpg"

function Works(props) {
  return (
    <Fragment>
      <Head>
        <title>React Works</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React works."
        />
      </Head>
      <WorkList works={props.works} />
    </Fragment>
  );
}



export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://JJop99:Jacopo99@cluster0.kajhjck.mongodb.net/works?retryWrites=true&w=majority"
  );
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
