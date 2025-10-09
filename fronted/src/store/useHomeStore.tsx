
import { axiosInstance } from "@/lib/axios"
import {create} from "zustand"

interface HomeStore{
    genero:any[],
    fechtGenero:()=>Promise<void>
    isloading:boolean,
    error:string|null
    fetchGeneroSpecific:(id)=>Promise<void>
    generoSpecific:any[]
    songRecomen:any[]
    fetchSongRecomend:(id)=>Promise<void>
}  
export const useHomeStore=create<HomeStore>((set)=>({
    isloading:false,
    error:null,
    generoSpecific:[],
    genero:[],
    songRecomen:[],
    fetchSongRecomend:async(id)=>{
        set({isloading:true,error:null})
        try{
            const {data}=await axiosInstance.get(`/song/similar/${id}`)
            set({songRecomen:data})
        }catch(err){
            set({error:err})
        }finally{
            set({isloading:false})
        }
    },
    fetchGeneroSpecific:async(id)=>{
        set({isloading:true,error:null})
        try{
            const {data}=await axiosInstance.get(`/song/top/genero/${id}`)
            set({generoSpecific:data})
        }catch(err){
            set({error:err})
        }finally{
            set({isloading:false})
        }

    },
    fechtGenero:async()=>{
        set({isloading:true,error:null})
        try{
            const response=await axiosInstance.get("/song/genero")            
            set({genero:response.data})
        }catch(err:any){
            set({error:err})
        }finally{
            set({isloading:false})
        }
    }
}))