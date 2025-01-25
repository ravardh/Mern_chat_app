import express from "express";
import {
  signup,
  login,
  logout,
  updateDP,
  checkAuth,
} from "../controllers/auth.controller.js";

import { TokenGaurd } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update_dp", TokenGaurd, updateDP);

router.get("/check", TokenGaurd, checkAuth);

export default router;
