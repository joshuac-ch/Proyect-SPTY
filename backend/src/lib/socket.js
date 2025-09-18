import { Server } from "socket.io";
import { Message } from "../models/messageModel.js";
export const InitialSocket=(server)=>{
    const io=new Server(server,{
        cors:{
            origin:`http://${process.env.HOST}:4173`,
            credentials:true
        }
    })
    const userSocket=new Map()
    const userActivitis=new Map()
    io.on('connection',(socket)=>{
        console.log("cliente conectado",socket.id)
        socket.on('user_connected',(userID)=>{
            userSocket.set(userID,socket.id)
            userActivitis.set(userID,"Idle")

            io.emit("user_connected",userID)

            socket.emit("users_online",Array.from(userSocket.keys()))

            io.emit("activities",Array.from(userActivitis.entries()))
        })
        socket.on('update_activity',({userID,activity})=>{
            userActivitis.set(userID,activity)
            io.emit('activity_updated',{userID,activity})
            console.log(userActivitis)
        })
        socket.on("send_message",async(data)=>{
            try{
                const {senderID,recivedID,content}=data
                const message=await Message.create({
                    senderID,
                    recivedID,
                    content
                })
                //solo if esta conectado enviar mensaje
                const recibedSoket=userSocket.get(recivedID)
                if(recibedSoket){
                    io.to(recibedSoket).emit("message_recived",message)
                }
                socket.emit("message_send",message)
            }catch(err){
                console.error(err.message)
            }
        })
        socket.on("disconnect",()=>{
            let disconectedUserId
            for(const [userId,socketId] of userSocket.entries()){
                if(socketId===socket.id){
                    disconectedUserId=userId
                    userSocket.delete(userId)
                    userActivitis.delete(userId)
                    break;
                }
            }
                if(disconectedUserId){
                    io.emit("disconnected",disconectedUserId)
            }
        })
    })   
}