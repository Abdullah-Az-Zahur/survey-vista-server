import client from "../config/db.js";
const paymentCollection = client.db("survey1DB").collection("payments");

export const createPaymentIntent = async (price) => {
    const amount = parseInt(price * 100); // Convert to cents
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
  
    return paymentIntent.client_secret;
  };

  export const savePayment = async (payment) => {
    const result = await paymentCollection.insertOne(payment);
    return result;
  };

  export const getAllPayments = async () => {
    const result = await paymentCollection.find().toArray();
    return result;
  };