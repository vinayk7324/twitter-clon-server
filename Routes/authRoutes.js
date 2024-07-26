import { Router } from "express";
import { passport } from "../passport.js";
import { client_url } from "../envProvider.js";
import { getGoogleAccountController, XregisterController } from "../controller/twitterAuthController.js";
import { SendOtp, twitterOtpVerification } from "../twitter-nodemailer/OTPController.js";
import { twitterUserModel } from "../model/twitterUserModel.js";
import createUserName from './../Helpers/createUsername.js';
import { hashXPassword } from "../Helpers/passwordHashing.js";

const router = Router()


router.get("/login/failed", (req, res) => {
    res.status(401).send({
        success: false,
        message: "Login failed!"
    })
});
router.get("/login/success", async (req, res) => {
    try {
        const user = await twitterUserModel.findOne({
            
            email:req.user?._json.email 
        });
        console.log(user);
        if(user){
           if(!user.googleId){
            const updateuser = await twitterUserModel({
                name:user.name,
                userName:user.userName,
                googleId:"",
                email:user.email,
                password:user.password,
                isAvatarSet:true,
                avatarImage:req.user?._json.picture,
                DOB:user.DOB,

            }).save()
            return res.status(200).send({
                success:false,
                message:"user already exist",
                user:updateuser
            })
           }
           return res.status(200).send({
            success:false,
            message:"user already exist",
            user:user
        })
        }
        const googleUser = req.user?._json;
        const userName = createUserName(googleUser?.name)
       console.log(req.user);
        const newUser = await twitterUserModel({
            name:googleUser.name,
            userName:userName,
            googleId:googleUser.sub,
            email:googleUser.email,
            isAvatarSet:true,
            password: await hashXPassword({password:userName}),
            avatarImage:googleUser.picture,
            DOB:"",
        }).save();
        if(newUser){
            return res.send({
                success:true,
                message:"register successfully",
                mailMessage: `this is your default password:: ${userName}`,
                user:newUser
            })
        }


    } catch (error) {
        console.log("error in login-success ::",error);

    }


})
router.get('/google/callback',
    passport.authenticate("google", {
        successRedirect: `${client_url}/`,
        failureRedirect: "/login/failed"


    })
)

router.get("/google", passport.authenticate("google", ["profile", "email"]));
router.post("/twitter-user/google-account-user", getGoogleAccountController);

router.get("/logout", (req, res) => {
    req.logOut((err) => {
        if (err) {
            console.log(err);
            return;
        }

    });
    res.redirect(`${client_url}/twitter-home`)
})

router.post('/send-otp', SendOtp);
router.post('/verify-otp', twitterOtpVerification);
router.post('/twitter-register', XregisterController);

export { router }
