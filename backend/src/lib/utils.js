import jwt from "jsonwebtoken";

export const generateToken = (userID, res) => {
  const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.cookie("jwt", token, {
    maxAge: 3 * 24 * 60 * 60 * 1000,
    httpOnly: true, //prevent XSS attack (Cross Site Scripting)
    sameSite: "strict", // CSRF attack Cross Site request Forgery attack
    secure: process.env.NODE_MODE !== "development",
  });

  return token;
};
