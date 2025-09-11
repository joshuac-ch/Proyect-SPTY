import {create} from "zustand"
import { axiosInstance } from "../lib/axios";
import type { Message, Users } from "../types";
import {io} from "socket.io-client"
interface ChatStore{
    users:Users[];
    fechtUsers:()=>Promise<void>;
    isloadding:boolean;
    error:null|string;
    isConected:boolean,
    socket:any,
    onlineUsers:Set<string>,
    userActivitys:Map<string,string>
    messages:Message[]

    initialSocket:(userid:string)=>void
    disconectSocket:()=>void
    sendMessage:(recivedID:string,senderID:string,content:string)=>void

}
const baseURL="http://localhost:5173/"
const socket=io(baseURL,{
    autoConnect:false,
    withCredentials:true
})
export const useChatStore=create<ChatStore>((set,get)=>({
    users:[],
    isloadding:false,
    error:null,
    socket:null,
    isConected:false,
    onlineUsers:new Set(),
    userActivitys:new Map(),
    messages:[],
    fechtUsers:async()=>{
        set({isloadding:true,error:null})
    try {
        const {data}=await axiosInstance.get("/users/g")        
        set({users:data})

    }catch(error:any) {
        set({error:error.response.data.message})
    }finally{
        set({isloadding:false})
    }
    },
    initialSocket:(userid:string)=>{
        if(!get().isConected){
            socket.connect()
            socket.emit("user_connected",userid)
            socket.on("user_online",(users:string[])=>{
                set({onlineUsers:new Set(users)})
            })
            
            socket.on("activities",(acti:[string,string][])=>{
                set({userActivitys:new Map(acti)})
            })

            socket.on("user_connected",(users:string)=>{
                set((s)=>({
                    onlineUsers:new Set([...s.onlineUsers,users])
                }))
            })

            socket.on("disconnect",(userID:string)=>{
                set((s)=>{
                    const newOnlineUsers=new Set(s.onlineUsers)
                    newOnlineUsers.delete(userID)
                    return {onlineUsers:newOnlineUsers}
                })
            })

            socket.on("receive_message",(message:Message)=>{
                set((s)=>({
                    messages:[...s.messages,message]
                }))
            })

            socket.on("message_sent",(message:Message)=>{
                set((s)=>({
                    messages:[...s.messages,message]
                }))
            })

            socket.on('activity_updated',({userID,activity})=>{
                set((s)=>{
                    const newActivities=new Map(s.userActivitys)
                    newActivities.set(userID,activity)
                    return {userActivitys:newActivities}
                })
            })
            set({isConected:true})
        }
    },
    disconectSocket:()=>{},
    sendMessage:()=>{}
}))