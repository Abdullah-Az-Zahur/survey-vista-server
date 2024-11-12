import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import surveyRoutes from "./routes/surveyRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/survey", surveyRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
