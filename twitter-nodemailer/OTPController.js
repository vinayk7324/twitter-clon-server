import { createTransport } from "nodemailer";
import { twitterUserModel } from "../model/twitterUserModel.js";
import { user_id, user_pass } from "../envProvider.js";

let systemOtp = '';
export const SendOtp = async (req, res) => {
    try {
        const { email } = req.body
        const isUser = await twitterUserModel.findOne({ email })
        if (isUser) {
            return res.send({
                success: false,
                message: "user already exist!"
            })
        }
        systemOtp = `${Math.floor(Math.random() * 10000) + 1000}`;
        console.log(user_id, user_pass);
        const transporter = createTransport({
            service: "gmail",
            auth: {
                user: `${user_id}`,
                pass: `${user_pass}`,
            }
        })

        transporter.sendMail({
            from: `${user_id}`,
            to: email,
            subject: 'Your OTP Code',
            html:
                `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        /* Inline styles will ensure better compatibility with email clients */
      </style>
    </head>
    <body>
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #4CAF50;">Your OTP Code</h2>
        <p>Use the following OTP to complete your verification process:</p>
        <p style="font-size: 24px; font-weight: bold; color: #000;">${systemOtp}</p>
        <p>This OTP is valid for the next 2 minutes. Please do not share this code with anyone.</p>
      </div>
    </body>
    </html>

            `



        }, (err, info) => {
            if (err) {
                console.log(err);
                return res.send({
                    success: false,
                    message: 'please wait! or send otp again.'
                })
            }
            res.send({
                success: true,
                message: "OTP sent Successfully!,check email"
            })
            console.log(info);


        })



    } catch (error) {
        console.log('error in sending otp  with :: ', error);
        return res.status(500).send({
            success: false,
            message: 'server problem,Please wait!'
        })

    }

}

export const twitterOtpVerification = async (req, res) => {
    try {

        const { otp } = req.body


        let OTP = ''
        for (let i = 0; i < otp.length; i++) {
            OTP += otp[i];

        }


        if (!OTP) {
            return res.send({
                success: false,
                message: 'Please Enter OTP'
            })
        }
        if (OTP !== systemOtp) {
            return res.send({
                success: false,
                message: 'invalid otp'
            })

        }
        return res.send({
            success: true,
            message: 'OTP matched!'
        })


    } catch (error) {
        console.log('error in verfication with:: ', error);
        return res.status(500).send({
            success: false,
            message: 'server problem, Please wait!'
        })

    }

}