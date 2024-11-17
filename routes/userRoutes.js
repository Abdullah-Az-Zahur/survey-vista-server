import express from "express";
import {
  getAllUsersController,
  getUserByEmailController,
  saveUserController,
  updateUserPaymentRoleController,
  updateUserRoleController,
} from "../controllers/userController.js";

const router = express.Router();

// Get requests
router.get("/users", getAllUsersController);
router.get("/user/:email", getUserByEmailController);

// Put requests
router.put("/user", saveUserController);

// Patch requests
router.patch("/users/update/:email", updateUserRoleController);
router.patch("/users/:email", updateUserPaymentRoleController);

export default router;
