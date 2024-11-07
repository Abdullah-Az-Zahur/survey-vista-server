import { Timestamp } from "mongodb";
import { connectDB } from "../config/db";
let collections = null;

(async () => {
  collections = await connectDB();
})();

export async function findUserByEmail(email) {
  return await collections.usersCollection.findOne({ email });
}

export async function saveUser(userData) {
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
}

export async function updateUser(email, userData) {
  return await collections.usersCollection.updateOne(
    { email },
    {
      $set: {
        ...userData,
        Timestamp: Date.now(),
      },
    }
  );
}

export async function getAllUsers() {
  return await collections.usersCollection.find().toArray();
}
