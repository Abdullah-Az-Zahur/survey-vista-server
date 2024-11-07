import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function connectDB() {
  await client.connect();
  console.log("MongoDB connected");
  return {
    surveyCollection: client.db("survey1DB").collection("survey"),
    usersCollection: client.db("survey1DB").collection("users"),
    paymentCollection: client.db("survey1DB").collection("payments"),
    surveyResultCollection: client.db("survey1DB").collection("surveyResult"),
  };
}

export { client };
