
import  mongoose  from 'mongoose';
import { db_url } from '../envProvider.js';
import colors from 'colors'
export const connectDb =async ()=>{
    try {
        const con = await  mongoose.connect(db_url);
        console.log("db url",db_url);
        console.log(`Db connect successfully with :: ${con.connection.host}`.bgGreen.white);
        
    } catch (error) {
        console.log("error in db-connection :: ",error);
    }
}