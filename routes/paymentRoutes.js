import express from "express";
import {
  createPaymentController,
  createPaymentIntentController,
  getAllPaymentsController,
} from "../controllers/paymentController.js";

const router = express.Router();

// Get request
router.get("/payments", getAllPaymentsController);

// Post request
router.post("/create-payment-intent", createPaymentIntentController);
router.post("/payments", createPaymentController);

export default router;
