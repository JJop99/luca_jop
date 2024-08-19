import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";
import NewWorkForm from "../../components/Works/NewWorkForm";

function NewWorkPage() {
  const router = useRouter();
  async function addWorkHandler(enteredWorkData) {
    const response = await fetch("/api/new-work", {
      method: "POST",
      body: JSON.stringify(enteredWorkData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    console.log(data);

    router.push("/");
  }

  return (
    <Fragment>
      <Head>
        <title>Add a new work</title>
        <meta
          name="description"
          content="Add your own works and create amazing networking opportunities."
        />
      </Head>
      <NewWorkForm onAddWork={addWorkHandler} />
    </Fragment>
  );
}

export default NewWorkPage;
