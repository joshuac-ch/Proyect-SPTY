import React, { useEffect } from 'react'
import { UseAuthStore } from '../../store/useAuthStore'
import Header from './components/Header'
import DashboradStast from './components/DashboradStast'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { Album, Music } from 'lucide-react'
import SongTabContent from './components/SongTabContent'
import AlbumTabContent from './components/AlbumTabContent'
import { useMusicStore } from '../../store/useMusicStore'

export default function AdminPage() {
  const {isAdmin,isloading}=UseAuthStore()
  const {fecthSong,fecthStat,fetchAlbums}=useMusicStore()
  useEffect(()=>{
    fecthStat()
    fecthSong()
    fetchAlbums()    
  },[fecthStat,fecthSong,fetchAlbums])

  if(!isAdmin &&!isloading) return <div>No autorizado</div>
  return (
   <>
   <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100 p-8">
    <Header></Header>
    <DashboradStast></DashboradStast>
    <Tabs defaultValue='songs' className='space-y-6'>
        <TabsList className='p-1 bg-zinc-800/50'>
            <TabsTrigger value='songs' className='data-[state=active]:bg-zinc-700'>
                <Music className='mr-2 size-4'></Music>
                Songs
            </TabsTrigger>
            <TabsTrigger value='albums' className='data-[state=active]:bg-zinc-700'>
                <Album className='mr-2 size-4'></Album>
                Albums
            </TabsTrigger>
        </TabsList>
        <TabsContent value='songs'>
            <SongTabContent></SongTabContent>
        </TabsContent>
        <TabsContent value='albums'>
            <AlbumTabContent></AlbumTabContent> 
        </TabsContent>
    </Tabs>
   </div>
   </>
  )
}
