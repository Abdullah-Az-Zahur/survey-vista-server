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

router.get("/", getSurveysController);
router.get("/all-survey", getAllSurveysController);
router.get("/count", getSurveyCountController);
router.get("/:id", verifyToken, getSurveyByIdController);

router.post("/", verifyToken, saveSurveyController);

router.patch("/:id", verifyToken, updateSurveyController);

router.delete("/:id", verifyToken, deleteSurveyByIdController);

export default router;
