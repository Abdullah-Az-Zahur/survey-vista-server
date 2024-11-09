import { createUser, findUserByEmail, updateUser,  } from "../models/userModel.js";

export const getUserByEmail = async (req, res) => {
  const email = req.params.email;
  const user = await findUserByEmail(email);
  res.send(user);
};

export const saveUserController = async (req, res) => {
  try {
    const user = req.body;

    if (!user?.email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const query = { email: user.email };

    // Check if user already exists
    const existingUser = await findUserByEmail(user.email);

    if (existingUser) {
      if (user.status === "Requested") {
        // Update status if user tries to change role
        const result = await updateUser(query, {
          $set: { status: user.status },
        });
        return res.status(200).json({ message: "Status updated", result });
      } else {
        // Return existing user if logging in again
        return res
          .status(200)
          .json({ message: "User already exists", user: existingUser });
      }
    }

    // Create a new user if not exists
    const result = await createUser(query, user, { upsert: true });

    res.status(201).json({ message: "User created", result });

    // Optional: Send a welcome email
    // sendWelcomeEmail(user.email);
    
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// export const updateUserController = async (req, res) => {
//   const result = await updateUser(req.params.email, req.body);
//   res.send(result);
// };
