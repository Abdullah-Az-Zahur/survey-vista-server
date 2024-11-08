import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  deleteSurveyByIdController,
  getAllSurveysController,
  getSurveyByIdController,
  saveSurveyController,
  updateSurveyController,
} from "../controllers/surveyController.js";

const router = express.Router();

router.get("/", verifyToken, getAllSurveysController);
router.get("/:id", verifyToken, getSurveyByIdController);

router.post("/", verifyToken, saveSurveyController);

router.patch("/:id", verifyToken, updateSurveyController);

router.delete("/:id", verifyToken, deleteSurveyByIdController);

export default router;
