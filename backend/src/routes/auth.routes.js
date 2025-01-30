import express from "express";
import path from "path";
import multer from "multer";
import {
  signup,
  login,
  logout,
  updateDP,
  checkAuth,
} from "../controllers/auth.controller.js";

import { TokenGaurd } from "../middleware/auth.middleware.js";


const router = express.Router();

const rootPath  = path.join(process.env.UPLOAD_FILE_PATH,"uploads");



import fs from "fs";
if (!fs.existsSync(rootPath)) {
  fs.mkdirSync(rootPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, rootPath); // Save files to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put("/updateDP", TokenGaurd, upload.single("profilePic"), updateDP);

router.get("/check", TokenGaurd, checkAuth);

export default router;
