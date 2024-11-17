import express from "express";
import { createPaymentIntentController } from "../controllers/paymentController.js";

const router = express.Router();

// Post request
router.post("/create-payment-intent", createPaymentIntentController);

export default router;
