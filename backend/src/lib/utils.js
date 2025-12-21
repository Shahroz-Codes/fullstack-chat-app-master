import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "lax", // Allow cross-origin for LAN access (changed from "strict")
    secure: false, // Allow HTTP for LAN testing (changed from process.env.NODE_ENV !== "development")
  });

  return token;
};
