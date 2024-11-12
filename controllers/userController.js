import { getAllUsers, getUserByEmail } from "../models/userModel.js";

export const getAllUsersController = async (req, res) => {
  const result = await getAllUsers();
  res.send(result);
};

export const getUserByEmailController = async (req, res) => {
  const email = req.params.email;
  const result = await getUserByEmail(email);
  res.send(result);
};
