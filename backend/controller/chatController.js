const asyncHandler = require("express-async-handler");
const chat = require("../model/chatmodel");
const Chat = require("../model/chatmodel");
const User = require("../model/userModel");

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }
  //   Note and is used to fetch whole both users i.e user with sent id and login user id
  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");
  //   this will populate latest message
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });
  //   isChat will have 2 elements
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

const fetchChats = async (req, res) => {
  console.log("inside fetch");
  try {
    var chats = await Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage");
       
    var chats =await User.populate(chats, {
      path:"latestMessage.sender",
      select:"name email pic",
    });
    console.log(chats);
    res.send(chats);
  } catch (error) {}
};
module.exports = {
  accessChat,
  fetchChats,
};
