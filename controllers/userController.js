const User = require("../models/userModal");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createNewUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // check if user already exists
    if (user) {
      return res.send({
        success: false,
        message: "User Already exists",
      });
    }
    // create new user
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    // check if user exists

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.send({
        success: false,
        message: "User does not exist",
      });
    }
    // check if password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.send({
        success: false,
        message: "Invalid Password",
      });
    }
    // create and assign a token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.send({
      success: true,
      message: "User logged in successfully",
      data: token,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
};
