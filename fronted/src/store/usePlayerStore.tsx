import {create} from "zustand"
import type { Song } from "../types"
import { useChatStore } from "./useChatStore"
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
    playAlbum:(songs:Song[],startIndex=0)=>{
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
    },
    togglePlay:()=>{
        const startplay=!get().isPlaying
        const currentSong=get().currentSong
        const sokect=useChatStore.getState().socket
        if(sokect.auth){
            sokect.emit("update_activity",{
                userID:sokect.auth.userId,
                activity:startplay && currentSong? `Escuchando ${currentSong.title} by ${currentSong.artist}`:"Idle"
            })
        }
        set({isPlaying:startplay})
    },
    playNext:()=>{
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
    playPrevious:()=>{
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