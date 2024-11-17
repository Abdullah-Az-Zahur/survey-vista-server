import express from "express";
import {
  createSurveyController,
  getAllSurveysController,
  getPaginatedSurveysController,
  getSurveyByIdController,
  getSurveyCountController,
  updateSurveyByIdController,
  updateSurveyVoteController,
} from "../controllers/surveyController.js";

const router = express.Router();

// Get request
router.get("/survey", getAllSurveysController);
router.get("/survey/:id", getSurveyByIdController);
router.get("/all-survey", getPaginatedSurveysController);
router.get("/survey-count", getSurveyCountController);

// Patch request
router.patch("/survey/:id", updateSurveyByIdController);
router.patch("/surveyVote/:id", updateSurveyVoteController);

// Post request

export default router;
router.post("/create", createSurveyController);
