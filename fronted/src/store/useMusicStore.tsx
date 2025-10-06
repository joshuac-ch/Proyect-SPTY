
import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import type { Album, Song, Stats } from '../types';
import toast from 'react-hot-toast';
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
    fecthShowSong:(id:string)=>Promise<void>;
    song:Song[]
    
    fetchAlbums:()=>Promise<void>;
    fetchAbumsById:(id:string)=>Promise<void>;
    fetchFeatureSongs:()=>Promise<void>
    fectchMadeForYou:()=>Promise<void>
    fectchTrendingSongs:()=>Promise<void>
    fecthSong:()=>Promise<void>
    fecthStat:()=>Promise<void>
    deleteSong:(id:string)=>Promise<void>
    deleteAlbum:(id:string)=>Promise<void>
    
}
export const useMusicStore=create<MusicStore>((set)=>({
  albums:[],
  songs:[],
  song:[],
  isLoading:false,
  error: null,
  currentAlbum:null,
  madeForYouSongs:[],
  trendingForYouSongs:[],
  featuredSongs:[],  
  stats:{
    totalAlbums:0,
    totalSonsg:0,
    totalUsers:0,
    totalArtist:0
  },
  fecthShowSong:async(id)=>{
    set({error:null,isLoading:true})
    try{
        const response=await axiosInstance.get(`/song/s/${id}`)
        set({song:response.data})
    }catch(err:any){
        set({error:err})
    }finally{
        set({isLoading:false})
    }
  },
  deleteAlbum:async(id)=>{
    set({error:null,isLoading:true})
    try{
        await axiosInstance.delete(`/admin/d/album/${id}`)
        set(state=>({
            albums:state.albums.filter(a=>a._id!=id)
        }))
        toast.success("Se elimino el album")
    }catch(err:any){
        toast.error("No se pudo eliminar el album")
        set({error:err})
    }finally{
        set({isLoading:false})
    }
  },
  deleteSong:async(id)=>{
    set({error:null,isLoading:true})
    try{
        await axiosInstance.delete(`/admin/delete/${id}`)
        set(state=>({
            songs:state.songs.filter(song=>song._id!=id)
        }))
        toast.success("Se elimino la cancion")
    }catch(err:any){
        toast.error("Hubo un error al eliminar la cancion")
        set({error:err})
    }finally{
        set({isLoading:false})
    }
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
            set({songs:data.modelo})
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
