import React from 'react'
import type { Song } from '../../types'
import { usePlayerStore } from '../../store/usePlayerStore'
import { Button } from '../../components/ui/button'
import { Pause, Play } from 'lucide-react'

export default function PlayButton({song}:{song:Song}) {
    const {currentSong,isPlaying,setCurrentSong,togglePlay}=usePlayerStore()
    const iscurrent=currentSong?._id==song._id
    const handlePlay=()=>{
        if(iscurrent)togglePlay()
        else setCurrentSong(song)
    }
    return (                 
   <>
   <Button 
   size={'icon'}
   onClick={handlePlay} className={`absolute bottom-3 right-2 bg-green-500 hover:bg-green-400
   hover:scale-105 transition-all opacity-0 translate-y-2 group-hover:translate-y-0 
   ${iscurrent?"opacity-100":"opacity-0 group-hover:opacity-100"}`}>
    {currentSong&&isPlaying?(<Pause className='size-4'/>):(<Play className='size-4'/>)}
   </Button>
   </>
  )
}
