import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { FormatDuration } from '@/pages/album/AlbumPage'
import { useMusicStore } from '@/store/useMusicStore'
import { usePlayerStore } from '@/store/usePlayerStore'
import { Edit, Play } from 'lucide-react'

import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function AlbumShow() {
    const {id}=useParams()
    const {fechtAlbumSpecific,albumSpecific}=useMusicStore()
     const {currentSong,isPlaying,playAlbum,togglePlay}=usePlayerStore()
    useEffect(()=>{
        fechtAlbumSpecific(id)
    },[id])
  return (
    <>
    <div className="h-full bg-zinc-900 rounded-2xl">
     <ScrollArea className='h-full'>  
     <div className="p-6 flex flex-col justify-center">
         <div className="mb-4 flex flex-row  gap-5 h-full items-end">
            <div className="">
                <img src={albumSpecific.imageUrl} className='w-60 h-60 object-cover rounded-md' alt="" />
            </div>
            <div className=' '>
                <div className="mb-4">
                    <p className='font-semibold text-md'>Album</p>
                </div>
               <div className='mb-4'>
                 <p className='text-7xl font-semibold'>{albumSpecific.title}</p>
               </div>
               <div className="flex gap-2">
                 <p className='text-md'>{albumSpecific.artist}</p>
                 <p className='text-md'>{albumSpecific?.songs?.length} canciones</p>
                <p className='text-md'>{albumSpecific.releaseYear}</p>
               </div>
            </div>
        
      </div>
       
        <div className='px-6'>
           <div className='space-y-2 py-4'>
               {
                   albumSpecific?.songs?.map((s,i)=>{
                       const iscurrentSong=currentSong?._id===s._id
                       return(            
                           <div  
                            
                           className='grid grid-cols-[16px_4fr_1fr_1fr_1fr] gap-4 px-4 py-2 text-sm 
                           text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer '
                            key={i}>
                               <div className='flex items-center justify-center'>
                                  {iscurrentSong && isPlaying?(
                                   <div className="flex items-end gap-0.5 h-max-6">
                                       <div
                                           className="w-0.5 bg-green-500 h-3"
                                           style={{
                                           animation: "pulseBar 0.8s ease-in-out infinite",
                                           transformOrigin: "bottom",
                                           }}
                                       ></div>
                                       <div
                                           className="w-0.5 bg-green-500 h-2"
                                           style={{
                                           animation: "pulseBar 1s ease-in-out infinite",
                                           transformOrigin: "bottom",
                                           }}
                                       ></div>
                                       <div
                                           className="w-0.5 bg-green-500 h-6"
                                           style={{
                                           animation: "pulseBar 0.7s ease-in-out infinite",
                                           transformOrigin: "bottom",
                                           }}
                                       ></div>
                                       <div
                                           className="w-0.5 bg-green-500 h-5"
                                           style={{
                                           animation: "pulseBar 0.6s ease-in-out infinite",
                                           transformOrigin: "bottom",
                                           }}
                                       ></div>
                                        <div
                                           className="w-0.5 bg-green-500 h-4"
                                           style={{
                                           animation: "pulseBar 0.8s ease-in-out infinite",
                                           transformOrigin: "bottom",
                                           }}
                                       ></div>
                                       </div>
                                   ):(
                                     <span className='group-hover:hidden'>{i+1}</span>
                                   )}
                                    {!iscurrentSong&&(
                                        <Play className='h-4 w-4 hidden group-hover:block'></Play>
                                    )}
                                </div>
                                <div className='flex items-center gap-3'>
                                    <img src={`${s.imageURL}`} className='size-10' alt="" />                                                
                                    <div>
                                        <div className='font-medium text-white hover:text-green-500'><Link to={`/song/s/${s._id}`}>{s.title}</Link></div>
                                        <div>{s.artist}</div>
                                    </div>                                                
                                </div>
                                <div className='flex items-center'>
                                    {s.createdAt.split("T")[0]}
                                </div>
                                <div className='flex items-center'>
                                    {FormatDuration(s.duration)}
                                </div>
                                <div className="flex items-center">
                                    <Button className='cursor-pointer ' variant={'ghost'} size={'icon'}>
                                        <Edit className='h-4 w-4'></Edit>
                                    </Button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
     </div>
     </ScrollArea>
    </div>
    </>
  )
}
