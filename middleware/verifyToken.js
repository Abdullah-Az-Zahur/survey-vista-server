import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    console.log("Token:", token);

    if (!token) {
      return res.status(401).send({ message: "Unauthorized access" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.error("Token verification error:", err);
        return res.status(401).send({ message: "Unauthorized access" });
      }

      req.user = decoded; // Attach the decoded token payload to req.user
      next();
    });
  } catch (error) {
    console.error("Error in verifyToken middleware:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
