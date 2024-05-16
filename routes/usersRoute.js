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
  updateProfilePicture,
} = require("../controllers/userController");

router.post("/register", createNewUser);
router.post("/login", loginUser);
router.get("/get-current-user", authMiddleware, getCurrentUser);
router.get("/get-all-users", authMiddleware, getAllUserExceptCurrent);
router.post("/update-profile-picture", authMiddleware, updateProfilePicture);

module.exports = router;
