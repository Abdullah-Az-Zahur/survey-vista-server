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