import client from "../config/db.js";

const usersCollection = client.db("survey1DB").collection("users");

export const getAllUsers = async () => {
  return await usersCollection.find().toArray();
};

export const getUserByEmail = async (email) => {
  return await usersCollection.findOne({ email: email });
};
