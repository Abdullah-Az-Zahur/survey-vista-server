import jwt from "jsonwebtoken";
import { getAllUsers } from "../models/userModel";

export const createToken = (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    })
    .sent({ success: true });
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    maxAge: 0,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });
  res.send({ success: true });
};

export const getAllUsersController = async (req, res) => {
  const users = await getAllUsers();
  res.send(users);
};
