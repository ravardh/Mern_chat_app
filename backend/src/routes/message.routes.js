import express from "express";
import { TokenGaurd } from "../middleware/auth.middleware.js";
import { getContacts, getMessages } from "../controllers/message.controller.js";


const router =  express.Router();

router.get("/users",TokenGaurd, getContacts)

router.get("/:id",TokenGaurd,getMessages)


export default router;