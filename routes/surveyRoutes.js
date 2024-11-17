import express from "express";
import { getAllSurveysController } from "../controllers/surveyController.js";

const router = express.Router();

// Get request
router.get("/survey", getAllSurveysController)

export default router;
