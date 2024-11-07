import express from "express";
import { createToken, logout } from "../controllers/authController";

const router = express.Router();

router.post("/jwt", createToken);
router.get("/logout", logout);

export default router;
