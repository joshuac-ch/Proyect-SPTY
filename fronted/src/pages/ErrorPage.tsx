import { Home, Music } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'

export default function ErrorPage() {
    const navigate=useNavigate()
  return (
   <div className="h-screen bg-neutral-900 flex items-center justify-center">
    <div className="text-center space-y-8 px-4">
        <div className="flex justify-center animate-bounce">
            <Music className='h-24 w-24 text-emerald-500 '></Music>
        </div>
        <div className="space-y-4">
            <h1 className="text-7xl font-bold text-white">404</h1>
            <h2 className="text-2xl font-semibold text-white">Pagina no encontrada</h2>
            <p className="text-neutral-400 max-w-md mx-auto">
                Parece que la pagina que busca no se encuentra disponible. Puede volver a la pagina de inicio 
            </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Button className='bg-neutral-500 hover:bg-emerald-500 text-white w-full sm:w-auto' 
            variant={'outline'} onClick={()=>navigate(-1)} >Regresar</Button>
            <Button onClick={()=>navigate("/")}
                className='bg-emerald-500 hover:bg-emerald-600 text-white w-full sm:w-auto'>
                <Home className='mr-2 h-4 w-4'></Home>Inicio        
            </Button>    
        </div>
    </div>
   </div>
  )
}
