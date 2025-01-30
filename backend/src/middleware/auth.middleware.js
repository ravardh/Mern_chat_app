import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const TokenGaurd = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      const error = new Error("Access Denied");
      error.statusCode = 401;
      next(error);
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      const error = new Error("Access Denied Token Expires");
      error.statusCode = 401;
      next(error);
    }

    const user = await User.findById(decode.userID).select("-password");
    if (!user) {
      const error = new Error("User Not Found");
      error.statusCode = 404;
      next(error);
    }

    req.user=user;
    next();
  } catch (error) {
    next(error);
  }
};
