const express = require("express");

const router = express.Router();
const {
  createNewChat,
  getAllChats,
  clearAllUnreadMessage,
} = require("../controllers/chatController");
//middleWare
const authMiddleware = require("../middleWare/authMiddleware");

router.post("/create-new-chat", authMiddleware, createNewChat);
router.get("/get-all-chats", authMiddleware, getAllChats);
router.post("/clear-unread-messages", authMiddleware, clearAllUnreadMessage);
module.exports = router;
