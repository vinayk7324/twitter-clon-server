
import { client_url } from "../envProvider.js";
import { hashXPassword } from "../Helpers/passwordHashing.js";
import { twitterUserModel } from "../model/twitterUserModel.js";

export const XregisterController = async (req,res)=>{
    try {
        const {name,userName,email,password,DOB} = req.body
        console.log(email,password,userName,name,DOB);
        const user = await twitterUserModel.findOne({email});
        if(user){
          return  res.send({
                success:false,
                message:"user already exist."
            })
        }
        const hashedPass = await hashXPassword({password:password});
        const newUser = await twitterUserModel({
            name:name,
            userName:userName,
            email:email,
            password:hashedPass,
            DOB:DOB,
            isAvatarSet:false,
            avatarImage:"avatar not set!"

        }).save()
       
       if(newUser){
        return res.send({
            success:true,
            message:"user register successfully",
            userDetails:{
                id:newUser._id,
                name:newUser.name,
                username:newUser.userName,
                email:newUser.email,
                DOB:newUser.DOB,
                isAvatarSet:newUser.isAvatarSet,
                avatarImage:newUser.avatarImage


            }
        })
       }



        
    } catch (error) {
        console.log("error at twitter-auth-controller with :: ",error);
        res.redirect(`${client_url}/error-page`);
        return;
        
    }

}

