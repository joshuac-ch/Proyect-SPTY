import React from 'react'
import { useChatStore } from '../../store/useChatStore'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'

export default function ChatHeader() {
  const {selectUser,onlineUsers}=useChatStore()
   
  return (
    <>
        <div className="p-4 boder-b border-zinc-800">
            <div className="flex items-center gap-3">
                <Avatar>
                    <AvatarImage src={selectUser?.imageUrl}></AvatarImage>
                    <AvatarFallback>{selectUser?.fullname[0]}</AvatarFallback>
                </Avatar>
            <div>
                <h2 className="font-medium">{selectUser?.fullname}</h2>
                <p className='text-sm text-zinc-400'>
                {onlineUsers.has(selectUser?.ClerkID)?"Online":"Ofline"}
                </p>
            </div>
            </div>
            
        </div>
    </>
  )
}
