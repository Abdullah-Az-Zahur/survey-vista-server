import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import surveyRoutes from "./routes/surveyRoutes.js";
import surveyResultRoutes from "./routes/surveyResultRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5000",
    "https://survey-vista.web.app",
  ],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes with prefix
// app.use("/auth", authRoutes);
// app.use("/user", userRoutes);
// app.use("/survey", surveyRoutes);
// app.use("/survey-result", surveyResultRoutes);

// Routes without prefix
app.use(authRoutes);
app.use(userRoutes);
app.use(surveyRoutes);
app.use(surveyResultRoutes);

// Server
app.get("/", (req, res) => {
  res.send("survey vista start with mvc");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
