import express from "express";
import { TokenGaurd } from "../middleware/auth.middleware.js";
import { getContacts } from "../controllers/message.controller.js";


const router =  express.Router();

router.get("/users",TokenGaurd, getContacts)


export default router;