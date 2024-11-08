import { findUserByEmail } from "../models/userModel.js";

export const verifyAdmin = async (req, res, next) => {
  const user = await findUserByEmail(req.user.email);
  if (!user || user.role !== "admin") {
    return res.status(401).send({ message: "Unauthorized access" });
  }
  next();
};

export const verifySurveyor = async (req, res, next) => {
  const user = await findUserByEmail(req.user.email);
  if (!user || user.role !== "surveyor") {
    return res.status(401).send({ message: "Unauthorized access" });
  }
  next();
};
