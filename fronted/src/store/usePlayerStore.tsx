import {create} from "zustand"
import type { Song } from "../types"
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
        set({
            currentSong:song,
            isPlaying:true,
            currenIndex:songIndex!==-1 ? songIndex : get().currenIndex            
        }) 
    },
    togglePlay:()=>{
        const startplay=!get().isPlaying
        set({isPlaying:startplay})
    },
    playNext:()=>{
        const {currenIndex,queue}=get()
        const nextIndex=currenIndex+1
        if(nextIndex<queue.length){
            const nextSong=queue[nextIndex]
            set({                
                currentSong:nextSong,
                currenIndex:nextIndex,
                isPlaying:true
            })
        }else{
            set({
                isPlaying:false
            })
        }
    },
    playPrevious:()=>{
        const {currenIndex,queue}=get()
        const preIndex=currenIndex-1
        if(preIndex>=0){
            const preSong=queue[preIndex]
            set({
                currenIndex:preIndex,
                currentSong:preSong,
                isPlaying:true
            })
        }else{
            set({isPlaying:false})
        }
    }
}))