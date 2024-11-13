import express from "express";
import {
  getAllUsersController,
  getUserByEmailController,
  saveUserController,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/users", getAllUsersController);
router.get("/user/:email", getUserByEmailController);

router.put("/user", saveUserController);

export default router;
