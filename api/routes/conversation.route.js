import express from "express";

import {
  createConversation,
  getConversations,
  getSingleConversation,
  updateConversation,
} from "../controllers/conversation.controller.js";

const router = express.Router();
router.get("/", getConversations);
router.put("/:id", updateConversation);
router.get("/single/:id", getSingleConversation);
router.post("/", createConversation);

export default router;
