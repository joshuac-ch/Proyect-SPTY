import { HomeIcon, Library, MessageCircle } from 'lucide-react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'
import { buttonVariants } from '../../components/ui/button'
import { SignedIn } from '@clerk/clerk-react'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import PlayListSkeleton from '../../components/skeletons/PlayListSkeleton'
import { useMusicStore } from '../../store/useMusicStore'

export default function LeftSidebar() {    
    const {songs,albums,isLoading,fetchAlbums}=useMusicStore()
    useEffect(()=>{
        fetchAlbums()
    },[fetchAlbums])
    console.log({albums})
  return (
    <>
    <div className='h-full flex flex-col gap-2 '>
        <div className='rounded-lg bg-zinc-900 p-4'>
            <div className='space-y-2'>
                <Link to={"/"} className={cn(buttonVariants({
                    variant:"ghost",
                    className:"w-full justify-start text-white hover:bg-zinc-800"
                }))}>
                    <HomeIcon className='mr-2 size-5'></HomeIcon>
                    <span className='hidden md:inline'>Home</span>
                </Link>
            </div>
            <SignedIn>
                <Link to={"/chat"} className={cn(buttonVariants({
                    variant:"ghost",
                    className:"w-full justify-start text-white hover:bg-zinc-800"
                }))}>
                    <MessageCircle className='mr-2 size-5'></MessageCircle>                    
                    <span className='hidden md:inline'>Messages</span>
                </Link>
            </SignedIn>
        </div>
        <div className='flex-1 rounded-lg bg-zinc-900 p-4'>
            <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center text-white'>
                    <Library className='size-5 mr-2'></Library>
                    <span className='hidden md:inline'>Playlist</span>
                </div>                
            </div>
            <ScrollArea className='h-[calc(100vh-300px)]'>
                <div className="space-y-2">
                    {isLoading?(
                        <PlayListSkeleton></PlayListSkeleton>
                    ):(
                        "some music"
                    )}
                </div>
            </ScrollArea>
        </div>
    </div>
    </>
  )
}
