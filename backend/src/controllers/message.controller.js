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

export const getMessages = async (req, res, next) => {
  try {
    const { id: usertoChatID } = req.params;
    const myID = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderID: myID, receiverID: usertoChatID },
        { senderID: usertoChatID, receiverID: myID },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};
