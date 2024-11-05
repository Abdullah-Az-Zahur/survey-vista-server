const { MongoClient } = require("mongodb");

let db;

const connectDB = async () => {
  try {
    await client.connect();
    db = client.db(process.env.DB_NAME);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

const getDB = () => db;

module.exports = { connectDB, getDB };
