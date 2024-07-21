import express from "express";
import cors from 'cors'
import { client_url,port } from "./envProvider.js";
import session from "express-session";
import {passport} from "./passport.js";
import webSocketSetup from "./webSocketSetup.js";
import http from 'http'
import{ router as AuthRoutes} from './Routes/authRoutes.js'
import { connectDb } from "./db/DBconnection.js";
import { avatarController } from "./controller/avatarController.js";
const App = express();
const server = http.createServer(App)
//websocket setup
webSocketSetup(server)
//session setup
App.use(session({
    secret:'hnddlelds',
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false}
}))

App.use(passport.initialize())
App.use(passport.session());
App.use(cors({
    origin: [client_url],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true

}))
App.use(express.json());

//database
connectDb();

App.use("/auth",AuthRoutes);
App.post("/upload",avatarController)



App.get('/', (req, res) => {
    res.send("Hello I am working")

})

App.listen(port, () => {
    console.log("server is listening... at http://localhost:3000  ");
})