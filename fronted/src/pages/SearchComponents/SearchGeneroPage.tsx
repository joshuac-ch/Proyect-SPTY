import { TopBar } from '@/components/TopBar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useHomeStore } from '@/store/useHomeStore'
import { Music } from 'lucide-react'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function SearchGeneroPage() {
  const {id}=useParams()
  const {generoSpecific, fetchGeneroSpecific}=useHomeStore()
  const colores=["#006450","#8400e7","#dc148c","#8400e7",
                "#1e3264","#608108","#0d73ec","#509bf5",
                "#e13300","#8d67ab","#477d95","#503750","#477d95",
                "#006450","#e91429","#8d67ab","#777777"
  ]
  const colorAleatorio=colores[Math.floor(Math.random()*colores.length)]
  
  useEffect(()=>{
    fetchGeneroSpecific(id)
  },[])
  
  return (
    <>
    <div className="h-full">
    <TopBar></TopBar>
    <ScrollArea className='h-[calc(100vh-180px)] overflow-hidden'>
    <div className="relative pb-20">       
    
     <div className={`absolute inset-0 pointer-events-none transition-colors duration-300`}
            aria-hidden='true'
            style={{backgroundImage: `linear-gradient(to bottom, ${colorAleatorio}, rgba(24,24,27), rgba(24,24,27))`}}>

     </div>
    <div className='relative p-4 sm:p-6'>
        <div className='mt-30 mb-20 '>
            <h1 className='text-2xl sm:text-7xl font-bold mb-6 text-gray'>{id}</h1>
        </div>
    <div className='flex flex-row gap-5 justify-around flex-wrap'>
        
       {generoSpecific.length>0?
       generoSpecific.map((g,i)=>{
        return(
            <div key={i} className="">
               <img src={g.imageURL} className='w-40 h-40 object-cover rounded-md' alt="" />
                <div>
                    <p className='w-40'>{g.title}</p>
                    <p className='w-40 pb-2'>{g.artist}</p>
                </div>
            </div>
        )
       })
       :<div className=''>
       
         <div className="flex justify-center animate-bounce">
            <Music className='h-24 w-24 text-emerald-500 '></Music>
        </div>
        <div className="space-y-4 flex-col flex items-center">
            <h1 className="text-7xl font-bold text-white">404</h1>
            <h2 className="text-2xl font-semibold text-white">No se encontraron canciones del genero {id}</h2>            
        </div>
       </div>}
    </div>
    </div>
    </div>
    </ScrollArea>
    </div>
    </>
  )
}
