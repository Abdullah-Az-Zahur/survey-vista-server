import { Timestamp } from "mongodb";
import { connectDB } from "../config/db.js";
import { query } from "express";
let collections = null;

(async () => {
  collections = await connectDB();
})();

export const getAllUsers = async () => {
  return await collections.usersCollection.find().toArray();
};

export const findUserByEmail = async (email) => {
  return await collections.usersCollection.findOne({ email });
};

export const saveUser = async (userData) => {
  const { email } = userData;
  const options = { upsert: true };
  return await collections.usersCollection.updateOne(
    { email },
    {
      $set: {
        ...userData,
        Timestamp: Date.now(),
      },
    },
    options
  );
};

export const updateUser = async (query, updateDoc, options = {}) => {
  return await collections.usersCollection.updateOne(query, updateDoc, options);
};

export const createUser = async (query, userData, options = {}) => {
  const updateDoc = {
    $set: {
      ...userData,
      Timestamp: Date.now(),
    },
  };
  return await collections.usersCollection.updateOne(query, updateDoc, options);
};
