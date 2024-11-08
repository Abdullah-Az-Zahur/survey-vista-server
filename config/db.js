import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nbrjeuw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
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
    surveyCollection: client.db().collection("survey"),
    usersCollection: client.db().collection("users"),
    paymentCollection: client.db().collection("payments"),
    surveyResultCollection: client.db().collection("surveyResult"),
  };
}

export { client };
