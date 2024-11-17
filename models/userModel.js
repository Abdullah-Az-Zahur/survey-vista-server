import { Timestamp } from "mongodb";
import client from "../config/db.js";

const usersCollection = client.db("survey1DB").collection("users");

export const getAllUsers = async () => {
  return await usersCollection.find().toArray();
};

export const getUserByEmail = async (email) => {
  return await usersCollection.findOne({ email: email });
};

export const updateUserStatus = async (email, status) => {
  return await usersCollection.updateOne({ email }, { $set: { status } });
};

export const saveOrUpdateUser = async (user) => {
  const query = { email: user.email };
  const options = { upsert: true };
  const updateDoc = {
    $set: {
      ...user,
      Timestamp: Date.now(),
    },
  };
  return await usersCollection.updateOne(query, updateDoc, options);
};

export const updateUserRole = async (email, user) => {
  const query = { email };
  const updateDoc = {
    $set: { ...user, Timestamp: Date.now() },
  };
  return await usersCollection.updateOne(query, updateDoc);
};
