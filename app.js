import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import surveyRoutes from "./routes/surveyRoutes";
import paymentRoutes from "./routes/paymentRoutes";

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
