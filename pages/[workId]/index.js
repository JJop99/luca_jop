import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
import WorkDetail from "../../components/works/WorkDetail";

function WorkDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.workData.title}</title>
        <meta
          name="description"
          content={props.workData.description}
        />
      </Head>
      <WorkDetail
        image={props.workData.image}
        title={props.workData.title}
        shortDescription={props.workData.shortDescription}
        description={props.workData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://JJop99:Jacopo99@cluster0.kajhjck.mongodb.net/works?retryWrites=true&w=majority"
  );
  const db = client.db();

  const worksCollection = db.collection("works");

  const works = await worksCollection.find({}, { _id: 1 }).toArray();

  client.close();
  return {
    fallback: 'blocking',
    paths: works.map((work) => ({
      params: { workId: work._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const workId = context.params.workId;
  const client = await MongoClient.connect(
    "mongodb+srv://JJop99:Jacopo99@cluster0.kajhjck.mongodb.net/works?retryWrites=true&w=majority"
  );
  const db = client.db();

  const worksCollection = db.collection("works");

  const selectedWork = await worksCollection.findOne({
    _id: ObjectId(workId),
  });

  client.close();
  console.log(workId);
  return {
    props: {
      workData: {
        id: selectedWork._id.toString(),
        title: selectedWork.title,
        image: selectedWork.image,
        shortDescription: selectedWork.shortDescription,
        description: selectedWork.description,
      },
    },
    revalidate: 1,
  };
}

export default WorkDetails;
