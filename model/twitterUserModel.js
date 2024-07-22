import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    },
    userName:{
        type:String,
        unique:true

    },
    googleId:{
        type:String,
        unique:true,
       

    },
   email:{
    type:String,
    unique:true,
    required:true
   },
   password:{
    type:String,
    unique:true,
    

   },
   DOB:{
    type:String,
    

   },
   isAvatarSet:{
    type:Boolean,
    default:false
   },
   avatarImage:{
    type:String,
   
   }


},{timestamps:true})

export const twitterUserModel = new mongoose.model("user",userSchema); 