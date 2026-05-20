import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const { title, images, description, year, shortDescription } = data;

    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();

    const worksCollection = db.collection("works");
    const result = await worksCollection.insertOne(data);
    console.log(result);

    client.close();

    res.status(201).json({ message: "Work inserted!" });
  }
}

export default handler;
