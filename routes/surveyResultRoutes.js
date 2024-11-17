import express from "express";
import {
  getAllSurveyResultsController,
  getSurveyResultByEmailController,
  updateSurveyResultController,
} from "../controllers/surveyResultController.js";

const router = express.Router();

// Get request
router.get("/all-survey-result", getAllSurveyResultsController);
router.get("/survey-result/:email", getSurveyResultByEmailController);

// Put request
router.put("/survey-result", updateSurveyResultController);

export default router;
