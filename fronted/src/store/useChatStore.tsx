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
    messages:Message[],

    selectUser:Users|null,

    initialSocket:(userId:string)=>void
    disconectSocket:()=>void
    sendMessage:(recivedID:string,senderID:string,content:string)=>void
    fecthMessage:(userId:string)=>Promise<void>
    setSelectUser:(user:Users|null)=>void
}
const baseURL="http://localhost:5000"
const socket=io(baseURL,{
    autoConnect:false,
    withCredentials:true
})
export const useChatStore=create<ChatStore>((set,get)=>({
    users:[],
    isloadding:false,
    error:null,
    socket:socket,
    isConected:false,
    onlineUsers:new Set(),
    userActivitys:new Map(),
    messages:[],
    selectUser:null,
    setSelectUser:(user)=>set({selectUser:user}),
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
    initialSocket:(userId:string)=>{
        if(!get().isConected){
            socket.auth={userId}
            socket.connect()
            socket.emit("user_connected",userId)
            socket.on("users_online",(users:string[])=>{
                set({onlineUsers:new Set(users)})
            })
            
            socket.on("activities",(userID:[string,string][])=>{
                set({userActivitys:new Map(userID)})
            })

            socket.on("user_connected",(users:string)=>{
                set((s)=>({
                    onlineUsers:new Set([...s.onlineUsers,users])
                }))
            })

            socket.on("disconnect",(userId:string)=>{
                set((s)=>{
                    const newOnlineUsers=new Set(s.onlineUsers)
                    newOnlineUsers.delete(userId)
                    return {onlineUsers:newOnlineUsers}
                })
            })

            socket.on("message_recived",(message:Message)=>{
                set((s)=>({
                    messages:[...s.messages,message]
                }))
            })

            socket.on("message_send",(message:Message)=>{
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
    disconectSocket:()=>{
        if(get().isConected){
        socket.disconnect()
        set({isConected:false})
    }
    },
    //segur con esto mñn
    sendMessage:async(recivedID,senderID,content)=>{
        const socket=get().socket
        if(!socket)return;
        socket.emit("send_message",{recivedID,senderID,content})
    },
    fecthMessage:async(userId:string)=>{
        set({isloadding:true,error:null})
        try{
            const {data}=await axiosInstance.get(`/users/message/${userId}`)
            set({messages:data}) 
        }catch(err:any){
            set({error:err})
        }finally{
            set({isloadding:false})
        }
    }
}))