import express from "express";
import { verifyToken } from "../middleware/authMiddleware";
import {
  getAllSurveysController,
  getSurveyByIdController,
} from "../controllers/surveyController";

const router = express.Router();

router.get("/", verifyToken, getAllSurveysController);
router.get("/:id", verifyToken, getSurveyByIdController);
