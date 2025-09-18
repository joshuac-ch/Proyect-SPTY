import { useUser } from '@clerk/clerk-react'
import React, { useState } from 'react'
import { useChatStore } from '../../store/useChatStore'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { Send } from 'lucide-react'

export default function MessageInput() {
  const [message, setmessage] = useState("")
  const {user}=useUser()
  const {selectUser,sendMessage}=useChatStore()
  const handleSend=()=>{
    
   
    sendMessage(String(selectUser?.ClerkID),user.id,message.trim())
    setmessage("")
  }
    return (
    <>
        <div className="p-4 mt-auto border-t border-zinc-800">
            <div className="flex gap-2">
                <Input
                
                placeholder='message'
                value={message}
                onChange={(e)=>setmessage(e.target.value)}
                className='bg-zinc-800 border-none'
                onKeyDown={(e)=>e.key==="Enter"&&handleSend}></Input>
                <Button size={'icon'} onClick={handleSend} disabled={!message.trim()}>
                    <Send className='size-4'></Send>
                </Button>
            </div>
        </div>
    </>
  )
}
