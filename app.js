import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import surveyRoutes from "./routes/surveyRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://survey-vista.web.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Route setup
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/survey", surveyRoutes);
app.use("/payments", paymentRoutes);

export default app;
