import { findUserByEmail, saveUser, updateUser } from "../models/userModel.js";

export const getUserByEmail = async (req, res) => {
  const email = req.params.email;
  const user = await findUserByEmail(email);
  res.send(user);
};

export const saveUserController = async (req, res) => {
  const result = await saveUser(req.body);
  res.send(result);
};

export const updateUserController = async (req, res) => {
  const result = await updateUser(req.params.email, req.body);
  res.send(result);
};
