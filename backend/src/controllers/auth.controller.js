import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
import path from "path";

const rootPath  = path.join(process.env.UPLOAD_FILE_PATH,"uploads");

export const signup = async (req, res, next) => {
  const { fullName, email, password } = req.body;
  console.log(fullName, email, password);
  try {
    if (!fullName || !email || !password) {
      const error = new Error("All Feilds Required!!!");
      error.statusCode = 400;
      next(error);
      return;
    }

    if (password.length < 8) {
      const error = new Error("Password Must Contains at least 8 Characters");
      error.statusCode = 400;
      next(error);
      return;
    }

    const user = await User.findOne({ email });

    if (user) {
      const error = new Error("Email already Exist");
      error.statusCode = 400;
      next(error);
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    console.log(newUser._id);
    res.status(201).json({ message: `Welcome to My Chat App ${fullName}` });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body)
  try {
    if (!email || !password) {
      const error = new Error("All Feilds Required!!!");
      error.statusCode = 400;
      next(error);
      return;
    }

    if (password.length < 8) {
      const error = new Error("Password Must Contains at least 8 Characters");
      error.statusCode = 400;
      next(error);
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("Invalid Email or Password");
      error.statusCode = 404;
      next(error);
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      const error = new Error("Invalid Email or Password");
      error.statusCode = 404;
      next(error);
      return;
    }

    generateToken(user._id, res);

    res.status(200).json({
      message: `Welcome Back ${user.fullName}`,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res, next) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "See you Soon 😎" });
  } catch (error) {
    next(error);
  }
};

export const updateDP = async (req, res, next) => {
  try {
    console.log("Received file:", req.file); // Log the file to verify multer is working
    const profilePic = req.file ? `${rootPath}/${req.file.filename}` : null;
    const userID = req.user._id;

    if (!profilePic) {
      const error = new Error("Profile pic required");
      error.statusCode = 400;
      return next(error);  // Ensure you return after calling next to stop further execution
    }

    console.log("Sending to Cloudinary:", profilePic);  // Check if the profilePic path is correct
    const uploadResponse = await cloudinary.uploader.upload(profilePic, {
      folder: "chit_chat_DP",
    });

    console.log("File uploaded to Cloudinary:", uploadResponse);

    await User.findByIdAndUpdate(
      userID,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    console.log("Uploaded to MongoDB");
    res.status(200).json({ message: "Profile Picture Uploaded" });
  } catch (error) {
    console.error("Error uploading profile pic:", error); // Log the error for debugging
    next(error);
  }
};


export const checkAuth = (req, res, next) => {
  try {
    res.status(200).json({
      _id:req.user._id,
      email: req.user.email,
      fullName: req.user.fullName,
      profilePic: req.user.profilePic,
    });
  } catch (error) {
    next(error);
  }
};
