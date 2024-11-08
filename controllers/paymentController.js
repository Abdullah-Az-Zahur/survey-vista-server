import stripe from "stripe";
import { getAllPayments, savePayment } from "../models/paymentModel";

const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  const { price } = req.body;
  const amount = parseInt(price * 100);

  const paymentIntent = await stripeInstance.paymentIntents.create({
    amount,
    currency: "usd",
    payment_method_types: ["card"],
  });

  res.send({ clientSecret: paymentIntent.client_secrete });
};

export const savePaymentController = async (req, res) => {
  const result = await savePayment(req.body);
  res.send(result);
};

export const getAllPaymentsController = async (req, res) => {
  const payments = await getAllPayments();
  res.send(payments);
};
