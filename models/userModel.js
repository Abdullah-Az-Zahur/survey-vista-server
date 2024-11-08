import { Timestamp } from "mongodb";
import { connectDB } from "../config/db";
let collections = null;

(async () => {
  collections = await connectDB();
})();

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

export const updateUser = async (email, userData) => {
  return await collections.usersCollection.updateOne(
    { email },
    {
      $set: {
        ...userData,
        Timestamp: Date.now(),
      },
    }
  );
};

export const getAllUsers = async () => {
  return await collections.usersCollection.find().toArray();
};
