import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  deleteSurveyByIdController,
  getAllSurveysController,
  getSurveyByIdController,
  getSurveyCountController,
  getSurveysController,
  saveSurveyController,
  updateSurveyController,
} from "../controllers/surveyController.js";

const router = express.Router();

// Get Controller
router.get("/", getSurveysController);
router.get("/all-survey", getAllSurveysController);
router.get("/count", getSurveyCountController);
router.get("/:id", verifyToken, getSurveyByIdController);

// Post Controller
router.post("/", verifyToken, saveSurveyController);

// Put Controller
router.put("/survey-result")

// Patch Controller
router.patch("/:id", verifyToken, updateSurveyController);

// Delete Controller
router.delete("/:id", verifyToken, deleteSurveyByIdController);

export default router;
