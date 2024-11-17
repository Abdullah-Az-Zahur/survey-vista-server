import { createPaymentIntent, getAllPayments, savePayment } from "../models/paymentModel.js";

export const createPaymentIntentController = async (req, res) => {
  try {
    const { price } = req.body;
    const clientSecret = await createPaymentIntent(price);
    res.send({
      clientSecret,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error creating payment intent", error });
  }
};

export const createPaymentController = async (req, res) => {
  try {
    const payment = req.body;
    const paymentResult = await savePayment(payment);
    res.send({ paymentResult });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error saving payment", error });
  }
};

export const getAllPaymentsController = async (req, res) => {
    try {
      const payments = await getAllPayments();
      res.send(payments);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error fetching payments", error });
    }
  };