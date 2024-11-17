import express from "express";
import {
  createPaymentController,
  createPaymentIntentController,
} from "../controllers/paymentController.js";

const router = express.Router();

// Post request
router.post("/create-payment-intent", createPaymentIntentController);
router.post("/payments", createPaymentController);

export default router;
