const express = require("express");

const router = express.Router();
const { createNewChat } = require("../controllers/chatController");
//middleWare
const authMiddleware = require("../middleWare/authMiddleware");

router.post("/create-new-chat", authMiddleware, createNewChat);

module.exports = router;
