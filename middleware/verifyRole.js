import { getUserByEmail } from "../models/userModel";

// Verify Admin Middleware
export const verifyAdmin = async (req, res, next) => {
  try {
    console.log("Verifying Admin...");
    const user = req.user;

    if (!user || !user.email) {
      return res
        .status(400)
        .send({ message: "Invalid request : missing  user email" });
    }

    const result = await getUserByEmail(user.email);
    console.log(`role: ${result.role}`);

    if (!result || result.role !== "admin") {
      return res.status(400).send({ message: "Unauthorized access!" });
    }

    next();
  } catch (error) {
    console.error("Error in verify Admin", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
