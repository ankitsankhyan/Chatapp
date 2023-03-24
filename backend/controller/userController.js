const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const generateToken = require('../config/generateToken');
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    console.log(user);
    res.status(201).json({
        
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token :generateToken(_id)
    });
  }
})

module.exports = {registerUser};