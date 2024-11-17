import express from "express";
import {
  getAllSurveysController,
  getPaginatedSurveysController,
  getSurveyByIdController,
  getSurveyCountController,
  updateSurveyByIdController,
} from "../controllers/surveyController.js";

const router = express.Router();

// Get request
router.get("/survey", getAllSurveysController);
router.get("/survey/:id", getSurveyByIdController);
router.get("/all-survey", getPaginatedSurveysController);
router.get("/survey-count", getSurveyCountController);

// Patch request
router.patch("/survey/:id", updateSurveyByIdController);

export default router;
