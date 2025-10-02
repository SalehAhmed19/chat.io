import express from "express";
import { protect } from "../middlewares/auth.js";
import {
  getMessages,
  getUsersForSidebar,
  markMessageSeen,
  sendMessage,
} from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.get("/users", protect, getUsersForSidebar);
messageRouter.get("/:id", protect, getMessages);
messageRouter.put("/mark/:id", protect, markMessageSeen);
messageRouter.post("/send/:id", protect, sendMessage);

export default messageRouter;
