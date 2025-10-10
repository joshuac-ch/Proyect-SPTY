import {create} from "zustand"
import type { Song } from "../types"
import { useChatStore } from "./useChatStore"
import { axiosInstance } from "@/lib/axios"


interface PlayerStore{
    currentSong:Song|null
    isPlaying:boolean
    queue:Song[]
    currenIndex:number
    initializeQueue:(songs:Song[])=>void
    playAlbum:(songs:Song[],startIndex:number)=>void
    setCurrentSong:(song:Song|null)=>void
    togglePlay:()=>void
    playNext:()=>void    
    playPrevious:()=>void
}
export const usePlayerStore=create<PlayerStore>((set,get)=>({
    currentSong:null,
    isPlaying:false,
    queue:[],
    currenIndex:-1,
    initializeQueue:(songs:Song[])=>{
        
        set({
            queue:songs,
            currentSong:get().currentSong||songs[0],
            currenIndex:get().currenIndex==-1?0:get().currenIndex
        })
        
    },
    playAlbum:async(songs:Song[],startIndex=0)=>{
        if(songs.length===0) return;
        const song=songs[startIndex]
        const sokect=useChatStore.getState().socket
        if(sokect.auth){
            sokect.emit("update_activity",{
                userID:sokect.auth.userId,
                activity:`Escuchando ${song.title} by ${song.artist}`
            })
                
        }
        set({
            queue:songs,
            currentSong:song,
            currenIndex:startIndex,
            isPlaying:true
        })
        console.log("cancion que se emite del album")
        sokect.emit("play-song",song)
        if(song){
            console.log("Cancion que escucha actualmente de playAlbum:", song.title)
            await axiosInstance.post("/admin/reproducir/s",{
                user_ID:sokect.auth.userId,
                song_ID:song._id,
                liked:false

            })            
            
        } 

    },
    setCurrentSong:(song:Song|null)=>{
        if(!song)return;
        const songIndex=get().queue.findIndex((s)=>s._id===song._id)
        const sokect=useChatStore.getState().socket
        if(sokect.auth){
            sokect.emit("update_activity",{
                userID:sokect.auth.userId,
                activity:`Escuchando ${song.title} by ${song.artist}`
            })
        }
        set({    
            currentSong:song,
            isPlaying:true,
            currenIndex:songIndex!==-1 ? songIndex : get().currenIndex            
        })
        sokect.emit("play-song",song) 
    },
    togglePlay:async()=>{
        const startplay=!get().isPlaying
        const currentSong=get().currentSong
        const sokect=useChatStore.getState().socket
        if(sokect.auth){
            sokect.emit("update_activity",{
                userID:sokect.auth.userId,
                activity:startplay && currentSong? `Escuchando ${currentSong.title} by ${currentSong.artist}`:"Idle"
            })
            
            //-------------
        }
        set({isPlaying:startplay})
        if(startplay&&currentSong){
        console.log("Cancion que escucha actualmente es de toggle play:", currentSong.title)
        await axiosInstance.post(`/admin/reproducir/s`,{
            user_ID:sokect.auth.userId,
            song_ID:currentSong._id,
            liked:false
        })
        console.log("mostrar imagen")
        sokect.emit("play-song",currentSong)

    }
    },
    playNext:async()=>{
        const {currenIndex,queue}=get()
        const nextIndex=currenIndex+1
        if(nextIndex<queue.length){
            const nextSong=queue[nextIndex]
            const sokect=useChatStore.getState().socket
            if(sokect.auth){
                sokect.emit("update_activity",{
                    userID:sokect.auth.userId,
                    activity:`Escuchando ${nextSong.title} by ${nextSong.artist}`
                })
            }
            set({                
                currentSong:nextSong,
                currenIndex:nextIndex,
                isPlaying:true
            })
            console.log("Se ejecuta el siguiente",nextSong.title)
            await axiosInstance.post("/admin/reproducir/s",{
                user_ID:sokect.auth.userId,
                song_ID:nextSong._id,
                liked:false
            })
            sokect.emit("play-song",nextSong)
        }else{
            set({
                isPlaying:false
            })
            const sokect=useChatStore.getState().socket
            if(sokect.auth){
                sokect.emit("update_activity",{
                    userID:sokect.auth.userId,
                    activity:`Ninguna`
                })
            }
        }
    },
    playPrevious:async()=>{
        const {currenIndex,queue}=get()
        const preIndex=currenIndex-1
        if(preIndex>=0){
            const preSong=queue[preIndex]
            const sokect=useChatStore.getState().socket
            if(sokect.auth){
                sokect.emit("update_activity",{
                    userID:sokect.auth.userId,
                    activity:`Escuchando ${preSong.title} by ${preSong.artist}`
                })
            }
            set({
                currenIndex:preIndex,
                currentSong:preSong,
                isPlaying:true
            })
            console.log("Se ejecuta el previos",preSong.title)
            await axiosInstance.post("/admin/reproducir/s",{
                user_ID:sokect.auth.userId,
                song_ID:preSong._id,
                liked:false
            })
            sokect.emit("play-song",preSong)
        }else{
            set({isPlaying:false})
            const sokect=useChatStore.getState().socket
            if(sokect.auth){
                sokect.emit("update_activity",{
                    userID:sokect.auth.userId,
                    activity:`Ninguna`
                })
            }
        }
    }
}))