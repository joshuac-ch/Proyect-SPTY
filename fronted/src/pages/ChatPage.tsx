import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import { useUser } from '@clerk/clerk-react'
import { TopBar } from '../components/TopBar'
import ListUsers from './ChatComponents/ListUsers'
import ChatHeader from './ChatComponents/ChatHeader'
import { ScrollArea } from '../components/ui/scroll-area'
import { Avatar, AvatarImage } from '../components/ui/avatar'
import MessageInput from './ChatComponents/MessageInput'

export default function ChatPage() {
  const FormaTime=(date:string)=>{
    return new Date(date).toLocaleDateString('PE',{
      hour:"2-digit",
      minute:"2-digit",
      hour12:true
    })
  }
  const {user}=useUser()
  const {fechtUsers,fecthMessage,selectUser,messages}=useChatStore()
  useEffect(()=>{
    if(user){
      fechtUsers()
    }
  },[fechtUsers,user])

  useEffect(()=>{
    if(selectUser){
      fecthMessage(selectUser.ClerkID)
    }
  },[selectUser,fecthMessage])
  const NoConversationPlaceHolder=()=>(
  <div className="flex flex-col items-center justify-center h-full space-y-6">
    <img src="/spotify.png" className='size-16 animate-bounce' alt="spotify" />
    <div className="text-center">
        <h3 className="text-zinc-300 text-lg font-medium mb-1">No conversarion select</h3>
        <p className='text-zinc-500 text-sm'>Elegir una Amigo para empezar a chatear</p>
    </div>
  </div>
) 

  return (
    <>
      <main className='h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden'>
        <TopBar></TopBar>
        <div className="grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]">
        <ListUsers></ListUsers>
        {/*Chat Message */}
        <div className="flex flex-col h-full">
          {selectUser?(
          <>
          <ChatHeader></ChatHeader>
          {/*Messages*/}
          <ScrollArea className='h-[calc(100vh-340px)]'>
            <div className="p-4 space-y-4">
              {messages.sort((a,b)=>new Date(a.createdAt)-new Date(b.createdAt))
              .map((m)=>(
                <div key={m._id} className={`flex items-start gap-3 ${m.senderID===user?.id?"flex-row-reverse":""}`} >
                  <Avatar className='size-8'>
                    <AvatarImage src={m.senderID===user?.id?user.imageUrl:selectUser.imageUrl}></AvatarImage>
                  </Avatar>
                  <div className={`rounded-lg p-3 max-w-[70%] 
                    ${m.senderID==user?.id?"bg-green-500":"bg-zinc-800"}`}>
                      <p className='text-sm'>{m.content}</p>
                      <span className='text-xs text-zinc-300 mt-1 block'>{FormaTime(m.createdAt)}</span>
                    </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <MessageInput></MessageInput>
          </>
          ):(
           <NoConversationPlaceHolder></NoConversationPlaceHolder>     
          )}
        </div>
        </div>
      </main>
    </>
  )
}
