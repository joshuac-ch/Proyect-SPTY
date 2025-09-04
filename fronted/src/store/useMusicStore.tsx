
import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import type { Album, Song, Stats } from '../types';
interface MusicStore{
    songs:Song[]
    albums:Album[]
    isLoading:boolean
    error:string|null
    currentAlbum:Album|null
    madeForYouSongs:Song[]
    trendingForYouSongs:Song[]
    featuredSongs:Song[]
    //
    stats:Stats
    //
    fetchAlbums:()=>Promise<void>;
    fetchAbumsById:(id:string)=>Promise<void>;
    fetchFeatureSongs:()=>Promise<void>
    fectchMadeForYou:()=>Promise<void>
    fectchTrendingSongs:()=>Promise<void>
    fecthSong:()=>Promise<void>
    fecthStat:()=>Promise<void>
}
export const useMusicStore=create<MusicStore>((set)=>({
  albums:[],
  songs:[],
  isLoading:false,
  error: null,
  currentAlbum:null,
  madeForYouSongs:[],
  trendingForYouSongs:[],
  featuredSongs:[],
  stats:{
    totalAlbums:0,
    totalSongs:0,
    totalUser:0,
    totalArtist:0
  },
  fetchFeatureSongs:async()=>{
    set({isLoading:true,error:null})
    try{
        const  response=await axiosInstance.get(`/song/g/features`)
        set({featuredSongs:response.data})
    }catch(error:any){
        set({error:error})
    }finally{
        set({isLoading:false})
    }
  },
  fectchMadeForYou:async()=>{
    set({isLoading:true,error:null})
    try{
        const response=await axiosInstance.get(`/song/g/made-for-you`)
        set({madeForYouSongs:response.data})
    }catch(err:any){
        set({error:err})
    }finally{
        set({isLoading:false})
    }
  },
  fectchTrendingSongs:async()=>{
    set({isLoading:true,error:null})
    try{
        const {data}=await axiosInstance.get(`/song/g/tendings`)
        set({trendingForYouSongs:data})
    }catch(err:any){
        set({error:err})
    }finally{
        set({isLoading:false})
    }
  },
  fetchAlbums: async()=>{
    set({isLoading:true,error:null})
    try{
        const response=await axiosInstance.get(`/album/g/`)
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
            const response=await axiosInstance.get(`/album/g/${id}`)
            set({currentAlbum:response.data})
        }catch(error:any){
            set({error:error.response.data.message})
        }finally{
            set({isLoading:false})
        } 
    },
    fecthSong:async()=>{
        set({isLoading:true,error:null})
        try{
            const {data}=await axiosInstance.get(`/song/g/songs`)
            set({songs:data})
        }catch(err:any){
            set({error:err})
        }finally{
            set({isLoading:false})
        }
    },
    fecthStat:async()=>{
        set({isLoading:true,error:null})
        try{
            const {data}=await axiosInstance.get(`/stats/`)
            set({stats:data})
        }catch(err:any){
           set({error:err}) 
        }finally{
            set({isLoading:false})
        }
    }
}))
