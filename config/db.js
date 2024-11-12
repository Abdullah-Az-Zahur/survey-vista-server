import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.connect()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

export default client;
