import React, { useEffect } from 'react'
import { Card, CardContent } from '../../components/ui/card'
import { Loader } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { axiosInstance } from '../../lib/axios'

export default function AuthPage() {
  const navigate=useNavigate()
  const {isLoaded,user}=useUser()
  useEffect(()=>{
    const AsyncUser=async()=>{
      try{
        if(!isLoaded && !user)return
        await axiosInstance.post(`/auth/`,{
          id:user?.id,
          firstName:user?.firstName,
          lastName:user?.lastName,
          imageUrl:user?.imageUrl
        })        
      }catch(err){
        console.error(`Eror en la authentication ${err}`)
      }finally{
        navigate("/")
      }
    }
    AsyncUser()
  },[isLoaded,user])
  return (
    <>
    <div className='w-full h-screen bg-black justify-center flex items-center'>
        <Card className='w-[90%] max-w-md bg-zinc-900 border-zinc-800'>
          <CardContent className='flex flex-col items-center gap-4 pt-6'>
              <Loader className='size-6 text-emerald-500 animate-spin'></Loader>
              <h3 className='text-zinc-400 text-xl font-bold'>Logueando....</h3>
              <p className='text-zinc-400 text-sm'>Redireccionando...</p>
          </CardContent>
        </Card>
    </div>
    </>
  )
}
