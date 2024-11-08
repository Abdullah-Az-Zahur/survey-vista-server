import { ObjectId } from "mongodb";
import { connectDB } from "../config/db.js";

let collections = null;

(async () => {
  collections = await connectDB();
})();

export const savePayment = async (paymentData) => {
  return await collections.paymentCollection.insertOne(paymentData);
};

export const getAllPayments = async () => {
  return await collections.paymentCollection.find().toArray();
};
