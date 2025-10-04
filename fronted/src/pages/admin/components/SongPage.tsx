import { Button } from '@/components/ui/button'
import { useMusicStore } from '@/store/useMusicStore'
import { usePlayerStore } from '@/store/usePlayerStore'
import { Pause, Play,CirclePlus, Download, Ellipsis } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import {FastAverageColor} from "fast-average-color"
import { ScrollArea } from '@/components/ui/scroll-area'

export default function SongPage() {
 
  const imageref=useRef<HTMLImageElement>(null)
  const [backgrond, setbackgrond] = useState("bg-red-200")
  const handleImageLoad=()=>{
    if(!imageref.current)return;
     const fac=new FastAverageColor()
    fac.getColorAsync(imageref.current)
    .then(color => {
      // color.hex -> color en hexadecimal
      // color.rgb -> color en rgb
      document.body.style.backgroundColor = color.hex;
      setbackgrond(color.hex)
      console.log("exito el color es",color.hex)
    })
    
    .catch(e => {
      console.log("Error al obtener color:", e);
    });
  }

  const {id}=useParams()
  const {fecthShowSong,song}=useMusicStore()
  useEffect(()=>{
    fecthShowSong(id)
  },[])
  const {currentAlbum}=useMusicStore()
  const {currentSong,isPlaying,togglePlay}=usePlayerStore()
  const handleTooglePlay=()=>{
    if(!currentSong)return
    const iscurrentSong=currentAlbum?.songs.some((s)=>s._id===currentSong._id)
    if(iscurrentSong) togglePlay()
    else{
        console.error("error")
    }
  }
  return (
    <>
    <div className="overflow-hidden relative rounded-2xl">
    <ScrollArea   className='h-[calc(100vh-110px)]'>
    <div className="flex flex-col rounded-2xl relative  bg-zinc-900 h-full w-full">
   <div className="relative flex flex-col pb-20 rounded-2xl  " style={{ background: `linear-gradient(180deg, ${backgrond} 0%, #1111 100%)` }}>
     <div className="flex  flex-row p-8 pb-10 gap-10">
     <div className="">
        <img src={`${song?.imageURL}?fm=auto&cs=srgb`} crossOrigin="anonymous" onLoad={handleImageLoad} ref={imageref} 
        className='w-65 h-60 rounded-md shadow-2xl' alt="" />
    </div>
    <div className="flex flex-col justify-center max-w-100">
        <p>Cancion</p>
       {/* <p className='text-2xl'>{song?.title.length>20?:}</p> */}
       {song?.title?.length<20?
       <p className='text-5xl'>{song?.title}</p>
       :
       <p className='text-2xl'>{song?.title}</p>
       }
        <div className="mt-2 flex gap-2">
            <p>{song?.artist?.length>20?song?.artist.slice(0,20)+"...":song?.artist}</p>
            <p>• {new Date(song?.createdAt).getFullYear()}</p>
            <p>• {new Date(song?.createdAt).getMinutes()}</p>
            <p>• {song?.plays}</p>
        </div>
    </div>
    </div>
    

    <div className="flex relative z-20 fex-row items-center gap-5 mt-2">
        <div className='px-6 flex items-center '>

                    <Button  onClick={handleTooglePlay} size='icon'
                        className='w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all'>
                            {isPlaying && currentAlbum?.songs.some(s=>s._id===currentSong?._id)?(
                                <Pause className='h-7 w-7 text-black'></Pause>                                
                            ):(
                                <Play className='h-7 w-7 text-black'></Play>
                                
                            )}
                    </Button>
                </div>
         <div className="">
                            <Button size='icon' className='w-10 h-10 rounded-full bg-white hover:scale-105 transition-all'>
                                      <CirclePlus className='h-full w-full'></CirclePlus>                         
                            </Button>
          </div>
          <div className="">
             <Button size='icon' className='w-10 h-10 rounded-full bg-white hover:scale-105 transition-all'>
                                    <Download className='w-10 h-10'></Download>               
              </Button>
         
          </div>
          <div className="">
                            <Button size={'icon'} className='w-10 h-10 rounded-full bg-white hover:scale-105 transition-all'>
                              <Ellipsis className='w-20 h-20'></Ellipsis>
                            </Button>
          </div>              
   </div>
   </div>
   
   <div className="relative bottom-34 h-5 w-full p-8">
    
   <div className="flex hover:bg-white/20 rounded-md p-2 flex-row gap-5 items-center mt-10">
    <div className="">
        <img src={song?.imageURL} className='w-20 h-20 rounded-full' alt="" />
    </div>
    <div className="">
        <p>Artista</p>
        <p>{song?.artist}</p>
    </div>
   </div>

   </div>
   
   <div className="relative pt-0 p-8 ">
      <div className="">
        <h2 className='text-2xl'>Recomendaciones</h2>
        <p className='text-md text-gray-500'>basadas en esta cancion</p>          
      </div>            
      <div className="">
        <h2 className='text-md text-gray-500'>Canciones populares de</h2>
        <p className='text-2xl'>{song?.artist}</p>
      </div>
                  
      
   </div>
    </div>
    </ScrollArea>
    </div>
    </>
  )
}
