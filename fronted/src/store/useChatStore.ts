import {create} from "zustand"
import { axiosInstance } from "../lib/axios";
import type { Users } from "../types";
interface ChatStore{
    users:Users[];
    fechtUsers:()=>Promise<void>;
    isloadding:boolean;
    error:null|string;
}
export const useChatStore=create<ChatStore>((set)=>({
    users:[],
    isloadding:false,
    error:null,
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
    }
}))