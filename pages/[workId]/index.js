import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
import WorkDetail from "../../components/Works/WorkDetail";
import { useLanguage } from '../../context/LanguageContext'; // Importa il LanguageContext


function WorkDetails(props) {
  const { language } = useLanguage(); // Ottieni la lingua dal LanguageContext
  console.log("lang: "+language);

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
        id={props.workData.id}
        images={props.workData.images}
        title={props.workData.title}
        shortDescription={props.workData.shortDescription}
        description={props.workData.description[language]}
        role={props.workData.role}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  let client;
  try {
    client = await MongoClient.connect(
      "mongodb+srv://JJop99:Jacopo99@cluster0.kajhjck.mongodb.net/works?retryWrites=true&w=majority"
    );
  } catch (error) {
    console.error("Connection to MongoDB failed", error);
    return { notFound: true };
  }
  
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

function isValidObjectId(id) {
  return /^[a-fA-F0-9]{24}$/.test(id);
}

export async function getStaticProps(context) {
  const workId = context.params.workId;


  //console.log("lang: "+JSON.stringify(context, null, 2));

  // Verifica se l'ID è valido
  if (!isValidObjectId(workId)) {
    return {
      notFound: true, // Restituisce una pagina 404 se l'ID non è valido
    };
  }

  
  let client;
  try {
    client = await MongoClient.connect(
      "mongodb+srv://JJop99:Jacopo99@cluster0.kajhjck.mongodb.net/works?retryWrites=true&w=majority"
    );
  } catch (error) {
    console.error("Connection to MongoDB failed", error);
    return { notFound: true };
  }
  const db = client.db();

  const worksCollection = db.collection("works");

  const selectedWork = await worksCollection.findOne({
    _id: ObjectId(workId),
  });

  client.close();

  if (!selectedWork) {
    return {
      notFound: true, // Questo renderà la pagina 404
    };
  }
  

  return {
    props: {
      workData: {
        id: selectedWork._id.toString(),
        title: selectedWork.title,
        images: JSON.parse(JSON.stringify(selectedWork.images)),
        shortDescription: selectedWork.shortDescription,
        description: selectedWork.description,
        role: selectedWork.role
      },
    },
    revalidate: 1,
  };
}

export default WorkDetails;
