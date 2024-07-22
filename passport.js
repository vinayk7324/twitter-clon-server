import passportAuth from 'passport-google-oauth20'
import passport from 'passport'
import { callback_url, client_id, client_secret} from './envProvider.js'
import { twitterUserModel } from './model/twitterUserModel.js'
const GoogleStrategy = passportAuth.Strategy

passport.use(
    new GoogleStrategy(
        {
            clientID:client_id,
            clientSecret:client_secret,
            callbackURL:`${callback_url}`,
            scope:["profile","email"]
        },
        (accessToken, refreshToken,profile,callback)=>{
          


        }
    )
)

passport.serializeUser((user,done)=>{
    done(null,user)
})
passport.deserializeUser((user,done)=>{
    done(null,user);
    

})

export {passport}