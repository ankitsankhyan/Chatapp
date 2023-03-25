const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{type:String, require:true},
    pic:{
        type:String,
        default:  
              "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",

    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false,
    },


},{
    timestamps:true
}
);
userSchema.pre('save', async function(next){
    if(!this.ismodified){
        next();
    }

    const salt = await bcrypt.genSalt(10);  // generates random string which is used to hash password
    // 
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.matchPassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword, this.password);
}

const User = mongoose.model("User", userSchema);
module.exports = User;