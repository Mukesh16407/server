const express = require("express");

const router = express.Router();

//middleWare
const authMiddleware = require("../middleWare/authMiddleware");
//controller
const { createNewUser, loginUser } = require("../controllers/userController");

router.post("/register", createNewUser);
router.post("/login", authMiddleware, loginUser);

module.exports = router;
