import WebSocket,{WebSocketServer} from "ws";
import { networkConnection } from "./controller/networkController.js";
import {client_url} from './envProvider.js'
import {Server} from 'socket.io'
const webSocketSetup = (server)=>{
    const io = new Server(server,{
        cors:{
            origin:[client_url],
            credentials:true
        }
    })
    io.on('connection',(socket)=>{
        console.log("user connected");
        socket.on('disconnect',()=>{
            console.log("user disconnect");
        })

    })
   
    

}
export default webSocketSetup

