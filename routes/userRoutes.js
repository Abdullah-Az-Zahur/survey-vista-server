import express from "express";
import {
  getAllUsersController,
  getUserByEmailController,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/users", getAllUsersController);
router.get("/user/:email", getUserByEmailController);

export default router;
