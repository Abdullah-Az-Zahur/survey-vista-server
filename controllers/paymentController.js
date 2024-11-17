import { createPaymentIntent } from "../models/paymentModel.js";

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
