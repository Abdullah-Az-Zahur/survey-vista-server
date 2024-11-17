import express from "express";
import {
  getAllSurveysController,
  getSurveyByIdController,
} from "../controllers/surveyController.js";

const router = express.Router();

// Get request
router.get("/survey", getAllSurveysController);
router.get("/survey/:id", getSurveyByIdController);

export default router;
