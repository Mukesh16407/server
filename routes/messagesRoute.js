const express = require("express");

const router = express.Router();

const { newMessage } = require("../controllers/messagesController");
//middleWare
const authMiddleware = require("../middleWare/authMiddleware");
//controller

router.post("/new-message", authMiddleware, newMessage);

module.exports = router;
