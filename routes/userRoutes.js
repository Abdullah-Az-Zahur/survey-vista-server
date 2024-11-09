import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  getUserByEmail,
  saveUserController,
  updateUserRoleController,
  // updateUserController,
} from "../controllers/userController.js";
import { getAllUsersController } from "../controllers/authController.js";

const router = express.Router();

// Get Router
router.get("/:email", verifyToken, getUserByEmail);
router.get("/", verifyToken, getAllUsersController);

// Put Router
router.put("/", verifyToken, saveUserController);

// Patch Router
router.patch("/update/:email", verifyToken, updateUserRoleController);

export default router;
