import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  createPaymentIntent,
  getAllPaymentsController,
  savePaymentController,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-payment-intent", verifyToken, createPaymentIntent);
router.post("/", verifyToken, savePaymentController);

router.get("/get", verifyToken, getAllPaymentsController);

export default router;
