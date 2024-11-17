import express from "express";
import {
  createSurveyController,
  deleteSurveyByIdController,
  getAllSurveysController,
  getPaginatedSurveysController,
  getSurveyByIdController,
  getSurveyCountController,
  getSurveysBySurveyorEmailController,
  updateSurveyByIdController,
  updateSurveyVoteController,
} from "../controllers/surveyController.js";

const router = express.Router();

// Get request
router.get("/survey", getAllSurveysController);
router.get("/survey/:id", getSurveyByIdController);
router.get("/all-survey", getPaginatedSurveysController);
router.get("/survey-count", getSurveyCountController);
router.get(
  "/my-listings/:email",
  // verifyToken,
  // verifySurveyor,
  getSurveysBySurveyorEmailController
);

// Patch request
router.patch("/survey/:id", updateSurveyByIdController);
router.patch("/surveyVote/:id", updateSurveyVoteController);

// Post request

export default router;
router.post("/create", createSurveyController);

// Delete request
router.delete("/my-listings/:id", deleteSurveyByIdController);
