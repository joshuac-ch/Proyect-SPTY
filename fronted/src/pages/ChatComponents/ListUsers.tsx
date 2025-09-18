import React from 'react'
import UserList from '../../components/skeletons/UserList'
import { useChatStore } from '../../store/useChatStore'
import { ScrollArea } from '../../components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'

export default function ListUsers() {
    const {isloadding,users,selectUser,setSelectUser,onlineUsers}=useChatStore()
   
  return (
    <>
    <div className="border-r border-zinc-800">
      <div className="flex flex-col h-full">
        <ScrollArea className='h-[calc(100vh-280px)]'>
          <div className="space-y-2 p-4">
            {isloadding?
            (<UserList></UserList>)
            :(
              users.map((user)=>(
                <div key={user._id} onClick={()=>setSelectUser(user)}
                    className={`flex items-center justify-center lg:justify-start gap-3 p-3 rounded-lg cursor-pointer transition-colors
                    ${selectUser?.ClerkID===user.ClerkID?"bg-zinc-800":"hover:bg-zinc-800/50"}`}>
                      <div className="relative">
                        <Avatar className='size-8 md:size-12'>
                          <AvatarImage src={user.imageUrl}></AvatarImage>
                          <AvatarFallback>{user.fullname[0]}</AvatarFallback>
                        </Avatar>
                        <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-zinc-900
                          ${onlineUsers.has(user.ClerkID)?"bg-green-500":"bg-zinc-500"}`}>

                        </div>
                      </div>
                      <div className="flex-1 min-w-0 lg:block hidden">
                        <span className='font-medium truncate'>{user.fullname}</span>
                      </div>
                </div>
              ))
            )
              
            }
          </div>
        </ScrollArea>
      </div>
    </div>
   
    </>
  )
}
