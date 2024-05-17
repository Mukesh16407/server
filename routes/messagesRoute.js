const express = require("express");

const router = express.Router();

const {
  newMessage,
  getAllMessage,
} = require("../controllers/messagesController");
//middleWare
const authMiddleware = require("../middleWare/authMiddleware");
//controller

router.post("/new-message", authMiddleware, newMessage);
router.get("/get-all-messages/:chatId", authMiddleware, getAllMessage);
module.exports = router;
