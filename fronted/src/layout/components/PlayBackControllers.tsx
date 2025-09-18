import { useEffect, useRef, useState } from "react"
import { usePlayerStore } from "../../store/usePlayerStore"
import { Slider } from "../../components/ui/slider"
import { Button } from "../../components/ui/button"
import { Laptop2, ListMusic, Mic2, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Volume1 } from "lucide-react"

export default function PlayBackControllers() {
  const FormatDurationTime=(seg:number)=>{
    const minutes=Math.floor(seg / 60)
    const remainginSecons=Math.floor(seg % 60)
    return `${minutes}:${remainginSecons.toString().padStart(2,"0")}`
  }
  const {isPlaying,togglePlay,playNext,playPrevious,currentSong}=usePlayerStore()
  const [volumen, setvolumen] = useState(50)
  const [currenTime, setcurrenTime] = useState(0)
  const [duration, setduration] = useState(0)
  const audioRef=useRef<HTMLAudioElement|null>(null)
  useEffect(()=>{
    audioRef.current=document.querySelector("audio")
    const audio=audioRef.current
    if(!audio)return
    const updateTime=()=>setcurrenTime(audio.currentTime)
    const updateduration=()=>setduration(audio.duration)
    audio.addEventListener('timeupdate',updateTime)
    audio.addEventListener('loadeddata',updateduration)

    const handlEndSong=()=>{
        usePlayerStore.setState({isPlaying:false})
    }
    audio?.addEventListener("ended",handlEndSong)
    return()=>{
        audio.removeEventListener('timeupdate',updateTime)
        audio.removeEventListener('loadeddata',updateduration)
        audio.removeEventListener('ended',handlEndSong)
    }
  },[currentSong])
  const handleSeek=(value:number[])=>{
    if(audioRef.current){
        audioRef.current.currentTime=value[0]
    }
  }  
  return (
    <>
    <footer className="h-20 sm:h-24 bg-zinc-900 border-t border-zinc-800 px-4">
        <div className="flex justify-center items-center h-full max-w-[1800px] mx-auto">
            <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%]">
                {currentSong&&(
                    <>
                    <img src={currentSong.imageURL} className="w-14 h-14 object-cover rounded-md" alt={currentSong.title} />
                    <div className="flex-1 min-w-0">
                        <div className="font-medium truncate hover:underline cursor-pointer">
                            {currentSong.title}
                        </div>
                        <div className="text-sm text-zinc-400 truncate hover:underline cursor-pointer">
                            {currentSong.artist}
                        </div>
                    </div>
                    </>
                )}
            </div>
            <div className="flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]">
               <div className="flex items-center gap-4 sm:gap-6">
                
                {/*Buttn Syns*/}
                <Button size={'icon'}
                variant={'ghost'}
                className="hidden sm:inline-flex hover:text-white text-zinc-400">
                <Shuffle className="h-4 w-4"></Shuffle>
                </Button>
                
                {/*Previos Button */}
                <Button size={'icon'}
                onClick={playPrevious}
                variant={'ghost'}
                className="hover:text-white text-zinc-400">
                  <SkipBack className="h-4 w-4"></SkipBack>
                </Button>

                {/*Toggle Button */}
                 <Button size={'icon'}
                 onClick={togglePlay}
                variant={'ghost'}
                className="bg-white hover:bg-white/80 text-black rounded-full h-8 w-8">
                  {isPlaying?(
                    <Pause className="h-5 w-5"></Pause>
                  ):(
                    <Play className="h-5 w-5"></Play>
                  )}
                </Button>
                
                {/* */}
                <Button size={'icon'}
                onClick={playNext}
                variant={'ghost'}
                className="hover:text-white text-zinc-400">
                  <SkipForward className="w-4 h-4"></SkipForward>
                </Button>

                <Button size={'icon'}
                variant={'ghost'}
                className="hidden sm:inline-flex hover:text-white text-zinc-400">
                <Repeat className="w-4 h-4"></Repeat>
                </Button>
               </div>

               <div className="hidden sm:flex items-center gap-2 w-full ">
                <div className="text-xs text-zinc-400">{FormatDurationTime(currenTime)}</div>
                <Slider
                value={[currenTime]}
                max={duration||100}
                step={1}
                className="w-full hover:cursor-grab rounded-md bg-green-500 active:cursor-grabbing"
                onValueChange={handleSeek}
                ></Slider>
                <div className="text-xs text-zinc-400">{FormatDurationTime(duration)}</div>
               </div>
            </div>

            {/*VOLUMEN CONTROLLER */}
            <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] justify-end">
              <Button size='icon' variant={'ghost'} className="hover:text-white text-zinc-400">
                <Mic2 className="w-4 h-4"></Mic2>
              </Button>
              <Button size='icon' variant={'ghost'} className="hover:text-white text-zinc-400">
               <ListMusic className="w-4 h-4"></ListMusic>
              </Button>
              <Button size='icon' variant={'ghost'} className="hover:text-white text-zinc-400">
                <Laptop2 className="w-4 h-4"></Laptop2>
              </Button>
              <div className="flex items-center gap-2">
                <Button size='icon' variant={'ghost'} className="hover:text-white text-zinc-400">
                  <Volume1 className="w-4 h-4"></Volume1>
                </Button>
                <Slider
                  max={100}
                  step={1}
                  className="w-24 hover:cursor-grab rounded-md bg-green-500 active:cursor-grabbing"
                  onValueChange={(v)=>{
                    setvolumen(v[0])
                    if(audioRef.current){
                      audioRef.current.volume=v[0]/100
                    }
                  }}
                ></Slider>                
              </div>
            </div>
        </div>
    </footer>
    </>
  )
}
