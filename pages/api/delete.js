import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "DELETE") {
    const workTitle = req.query.title;

    let client;

    try {
      client = await MongoClient.connect(process.env.MONGODB_URI);
    } catch (error) {
      res.status(500).json({ message: "Could not connect to database." });
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection("works").deleteOne({ title: workTitle });

      if (result.deletedCount === 0) {
        res.status(404).json({ message: "Work not found!" });
        return;
      }

      res.status(200).json({ message: "Work deleted successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Deleting the work failed!" });
    } finally {
      client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed!" });
  }
}

export default handler;
