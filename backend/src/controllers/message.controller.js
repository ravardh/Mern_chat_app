import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getContacts = async (req, res, next) => {
  try {
    const loggedInUserId = req.user._id;

    const contacts = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );

    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};
