import { useEffect, useRef } from 'react'
import { usePlayerStore } from '../../store/usePlayerStore'

export default function AudioPlayer() {
  const audioRef=useRef<HTMLAudioElement>(null)
  const prevSongRef=useRef<string|null>(null)
  const {isPlaying,currentSong,playNext}=usePlayerStore()
    //paudar y comenzar la cancion
    useEffect(()=>{
      if(isPlaying)audioRef.current?.play()
      else audioRef.current?.pause()  
    },[isPlaying])

    //cuando la cancion termine pasar a la siguyiente
    useEffect(()=>{
       const audio=audioRef.current
       const handleNext=()=>{
        playNext()
       }
       audio?.addEventListener("ended",handleNext)  
       return ()=>audio?.removeEventListener("ended",handleNext)
    },[playNext])
    //
    useEffect(()=>{
        if(!audioRef.current || !currentSong)return;
       const audio=audioRef.current
       const changeSong=prevSongRef.current!==currentSong.audioURL
       if(changeSong){
          audio.src=currentSong.audioURL
          audio.currentTime=0
          prevSongRef.current=currentSong.audioURL
          if(isPlaying) audio.play()
        } 
       
       

    },[isPlaying,currentSong])
    return (
    <>
        <audio ref={audioRef}></audio>
    </>
  )
}
