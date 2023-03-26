const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const chatmodel = mongoose.Schema({

    chatName:{
        type:String,
        trim:true,
        require:true,
    },
    isGroupChat:{type:Boolean, default:false},
    users:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Message'
    },
    groupAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
}
    ,{
        timeStamps:true, 
    }

)

const chat = mongoose.model("chat", chatmodel);

module.exports = chat;