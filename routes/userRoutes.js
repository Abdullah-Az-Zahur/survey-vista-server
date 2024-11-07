import express from "express";
import { verifyToken } from "../middleware/authMiddleware";
import {
  getUserByEmail,
  saveUserController,
  updateUserController,
} from "../controllers/userController";
import { getAllUsersController } from "../controllers/authController";

const router = express.Router();

// Get Router
router.get("/:email", verifyToken, getUserByEmail);
router.get("/", verifyToken, getAllUsersController);

// Put Router
router.put("/", verifyToken, saveUserController);

// Patch Router
router.patch("/update/:email", verifyToken, updateUserController);

export default router;
