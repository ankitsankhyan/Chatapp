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
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

const createGroupChat = asyncHandler(async(req, res) => {
    if(!req.body.users || !req.body.name){
      return res.status(400).json({message:"please fill all fields"});
    }
// users give will be in string hence we have to parse them into array
    var users = JSON.parse(req.body.users);
    if(users.length < 2){
      return res.status(400).send("No more than 2 users are required");
    }

    users.push(req.user);
    // creating group chat
    try{
       const groupChat = await Chat.create({
        chatName: req.body.name,
        users:users,
        isGroupChat:true,
        groupAdmin:req.user,
       })
       const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
       .populate("users", "-password")
       .populate("groupAdmin", "-password");
 
     res.status(200).json(fullGroupChat);

       
    }catch(error){
      throw new Error(error.message);
    }
})


const renameGroup = asyncHandler(async (req, res) => {
  console.log('running');
  const { chatId, chatName } = req.body;
 
// note new = true basically returns updated values
  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChat);
  }
});

const addToGroup = asyncHandler(async(req,res) =>{
      
  const{chatId, userId} = req.body;

  const added = await Chat.findByIdAndUpdate(chatId, {
     
        $push :{users: userId},
    
  },
    {new: true}
  ).populate("users", "-password")
   .populate("groupAdmin", "-password");


   if(added){
    res.status(200).json({
      added
    })
   }else{
    throw new Error('No Chat found');
   }


});
const removeFromGroup= asyncHandler(async(req, res) =>{
      const {chatId , userId} = req.body;

      const removed =await Chat.findByIdAndDelete(chatId, {
           $pull:{users:userId}
      })

      if(removed){
        res.status(200).json({
          removed
        })
      }else{
        throw new Error('No User found');
      }
})

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
