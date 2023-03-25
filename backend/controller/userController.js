const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const generateToken = require('../config/generateToken');

const registerUser = asyncHandler(async (req, res) => {
  console.log('printing');
  console.log(req.body);
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
      token :generateToken(user._id)
    });
  }else{
    return res.status(400);
  }


})

const authUser = asyncHandler(async(req, res)=>{
  const{email,password} = req.body;
  const user = await User.findOne({email});
  
  console.log(user.matchPassword);
  if (user && (user.matchPassword(password))) {
    console.log(user);
    res.status(201).json({
        
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token :generateToken(user._id)
    });
  }else{
    res.status(400);
    throw new Error('No user found');
  }
})

module.exports = {registerUser, authUser};