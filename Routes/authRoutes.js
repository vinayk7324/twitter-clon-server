import { Router } from "express";
import {passport} from "../passport.js";
import { client_url } from "../envProvider.js";
import { XregisterController } from "../controller/twitterAuthController.js";
import { SendOtp, twitterOtpVerification } from "../twitter-nodemailer/OTPController.js";

const router = Router()


router.get("/login/failed",(req,res)=>{ 
    res.status(401).send({
        success:false,
        message:"Login failed!"
    })
})
router.get('/google/callback',
    passport.authenticate("google" ,{
        successRedirect:`${client_url}/twitter-home-page`,
       

    })
)

router.get("/google",passport.authenticate("google",["profile","email"]));

router.get("/logout",(req,res)=>{
    req.logOut((err)=>{
        if(err){
            console.log(err);
            return;
        }

    });
    res.redirect(`${client_url}/twitter-home-page`)
})

router.post('/send-otp',SendOtp);
router.post('/verify-otp',twitterOtpVerification);
router.post('/twitter-register',XregisterController);

export { router}