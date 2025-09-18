import { useAuth } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../lib/axios'
import { Loader } from 'lucide-react'
import { UseAuthStore } from '../store/useAuthStore'
import { useChatStore } from '../store/useChatStore'

export default function Autprovider({children}:{children:React.ReactNode}) {
  const {checAdminStatus}=UseAuthStore()  
  const {initialSocket,disconectSocket}=useChatStore()
  const updateApiToken=(token:string|null)=>{
    if(token){
        axiosInstance.defaults.headers.common["Authorization"]=`Bearer ${token}`
    }else{
        delete axiosInstance.defaults.headers.common["Authorization"]
    }
}
    const {getToken,userId}=useAuth()
    const [loadding, setloadding] = useState(true)
    useEffect(()=>{
        const initAuht=async()=>{
            try{
                const token=await getToken()
                updateApiToken(token)
                if(token){
                    await checAdminStatus()
                    {/*Inicializancon el socket */}
                    if(userId){
                    initialSocket(userId)
                    }
                }
                //setloadding(false)
            }catch(err){
                updateApiToken(null)
                console.error("Error Provider",err)
            }finally{
                setloadding(false)
            }
        }
        initAuht()
        return()=>{disconectSocket()}
    },[getToken,userId,checAdminStatus,initialSocket,disconectSocket])
    if(loadding)return(
        <div className='h-screen w-full flex items-center justify-center'>
            <Loader className='size-8 text-emerald-500 animate-spin'></Loader>
        </div>
    )
    return (
        <div>{children}</div>    
  )
}
