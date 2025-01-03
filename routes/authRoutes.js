import express from "express";
import { createToken, logout } from "../controllers/authController.js";

const router = express.Router();

// Post request
router.post("/jwt", createToken);

router.get("/logout", logout);

export default router;
