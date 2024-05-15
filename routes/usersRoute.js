const express = require("express");

const router = express.Router();

//middleWare
const authMiddleware = require("../middleWare/authMiddleware");
//controller
const {
  createNewUser,
  loginUser,
  getCurrentUser,
  getAllUserExceptCurrent,
} = require("../controllers/userController");

router.post("/register", createNewUser);
router.post("/login", loginUser);
router.get("/get-current-user", authMiddleware, getCurrentUser);
router.get("/get-all-users", authMiddleware, getAllUserExceptCurrent);

module.exports = router;
