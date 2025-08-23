
import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import type { Album, Song } from '../types';
interface MusicStore{
    songs:Song[];
    albums:Album[];
    isLoading:boolean;
    error:string|null;
    currentAlbum:Album|null
    fetchAlbums:()=>Promise<void>;
    fetchAbumsById:(id:string)=>Promise<void>;
}
export const useMusicStore=create<MusicStore>((set)=>({
  albums:[],
  songs:[],
  isLoading:false,
  error: null,
  currentAlbum:null,
  fetchAlbums: async()=>{
    set({isLoading:true,error:null})
    try{
        const response=await axiosInstance.get(`/album/g/album`)
        set({albums:response.data})

    }catch(error:any){
        set({error: error.response.data.message})
    }finally{
        set({isLoading:false})
    }
    },
    fetchAbumsById:async(id)=>{
        set({isLoading:true,error:null})
        try{
            const response=await axiosInstance.get(`/album/g/album/${id}`)
            set({currentAlbum:response.data})
        }catch(error:any){
            set({error:error.response.data.message})
        }finally{
            set({isLoading:false})
        } 
    },
}))
