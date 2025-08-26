import {create} from "zustand"
import { axiosInstance } from "../lib/axios";
interface AuthStore{
    isAdmin:boolean;
    isloading:boolean;
    error:string|null;
    checAdminStatus:()=>Promise<void>
    reset:()=>void
}
export const UseAuthStore=create<AuthStore>((set)=>({
    isAdmin:false,
    isloading:false,
    error:null,
    checAdminStatus:async()=>{
        set({isloading:true,error:null})  
        try {
            const response=await axiosInstance.get("/admin/check")
            set({isAdmin:response.data.admin})
        } catch (error:any) {
            set({isAdmin:false,error:error})
        }finally{
            set({isloading:false})
        }
    },
    reset:()=>{
        set({isAdmin:false,isloading:false,error:null})
    }

}))