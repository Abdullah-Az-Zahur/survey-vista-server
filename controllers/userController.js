import {
  getAllUsers,
  getUserByEmail,
  saveOrUpdateUser,
  updateUserStatus,
} from "../models/userModel.js";

export const getAllUsersController = async (req, res) => {
  const result = await getAllUsers();
  res.send(result);
};

export const getUserByEmailController = async (req, res) => {
  const email = req.params.email;
  const result = await getUserByEmail(email);
  res.send(result);
};

export const saveUserController = async (req, res) => {
  const user = req.body;

  try {
    const existingUser = await getUserByEmail(user.email);

    if (existingUser) {
      if (user.status === "Requested") {
        // Update status if user role is changing
        const result = await updateUserStatus(user.email, user.status);
        return res.send(result);
      } else {
        return res.send(existingUser);
      }
    }

    // Save new user
    const result = await saveOrUpdateUser(user);

    // to do
    // Optional: Send welcome email (uncomment when ready)

    res.send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
