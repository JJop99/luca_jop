import Head from "next/head";
import { MongoClient } from "mongodb";
import { Fragment } from "react";
import InProgressList from "../../components/InProgress/InProgressList";

function InProgress(props) {
  return (
    <Fragment>
      <Head>
        <title>React In Progress</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React works."
        />
      </Head>
      <InProgressList inProgress={props.inProgress} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://JJop99:Jacopo99@cluster0.kajhjck.mongodb.net/inProgress?retryWrites=true&w=majority"
  );
  const db = client.db();

  const inProgressCollection = db.collection("inProgress");

  const inProgress = await inProgressCollection.find().toArray();

  client.close();
  return {
    props: {
      inProgress: inProgress.map((work) => ({
        title: inProgress.title,
        image: inProgress.image,
        shortDescription: inProgress.shortDescription,
        id: inProgress._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default InProgress;
