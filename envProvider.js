import dotenv from "dotenv"
dotenv.config();

const port = process.env.PORT
const client_url = process.env.CLIENT_URL
const client_id = process.env.CLIENT_ID 
const client_secret = process.env.CLIENT_SECRET
const callback_url = process.env.CALLBACK_URL
const db_url = process.env.DB_URL
const user_id = process.env.USER_ID
const user_pass = process.env.PASSWORD



export{client_url,user_id, user_pass,client_secret,client_id,port,callback_url,db_url}
