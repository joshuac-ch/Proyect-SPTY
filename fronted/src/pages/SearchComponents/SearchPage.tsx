import { TopBar } from '@/components/TopBar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useHomeStore } from '@/store/useHomeStore'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function SearchPage() {
  const {genero,fechtGenero}=useHomeStore()
  useEffect(()=>{
    
        fechtGenero()
    
  },[fechtGenero])
  const colores=["#006450","#8400e7","#dc148c","#8400e7",
                "#1e3264","#608108","#0d73ec","#509bf5",
                "#e13300","#8d67ab","#477d95","#503750","#477d95",
                "#006450","#e91429","#8d67ab","#777777"
  ]
  return (
    <div className="rounded-2xl h-full bg-gradient-to-b from-zinc-800 to-zinc-900 ">
        <TopBar></TopBar>
        <ScrollArea className='h-[calc(100vh-180px)]'>
            <div className="p-4 sm:p-6 ">
                <h1 className='text-2xl sm:text-3xl font-bold mb-6'>Explorar Todo</h1>
                
                <div className="flex flex-wrap flex-row gap-6">
                    {genero.map((g,i)=>{
                        return(
                            <Link key={i} to={`/search/genero/${g}`}>
                            <div style={{background:`${colores[i%17]}`}} className="border-2 cursor-pointer flex flex-row items-start  rounded-lg w-60 h-25 bg-zinc-600 p-4">
                                <h2 className='text-xl font-bold sm:text-xl'>{g}</h2>
                            </div>
                            </Link>
                        )
                    })}
                 </div>    
                
            </div>
        </ScrollArea>
    </div>
  )
}
