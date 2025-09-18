import { useEffect } from 'react'
import { useChatStore } from '../../store/useChatStore'
import { HeadphonesIcon, Music, Users } from 'lucide-react'
import { useUser } from '@clerk/clerk-react'
import { ScrollArea } from '../../components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'

export default function RigthFriendM() {
  const {users,fechtUsers,onlineUsers,userActivitys}=useChatStore()
  const {user}=useUser()
  useEffect(()=>{
   if(user) fechtUsers()
  },[fechtUsers,user])
  
  return (
    <>
       <div className='h-full bg-zinc-900 rounded-lg flex flex-col'>
        <div className='p-4 flex justify-between items-center border-b border-zinc-800'>
            <div className='flex items-center gap-2'>
                <Users className='size-5 shrink-0'></Users>
                <h2 className='font-semibold'>What they're listening to</h2>
            </div>
        </div>
        {!user&&(
            <LoginPromt></LoginPromt>
        )}
        <ScrollArea className='flex-1'>
            <div className='p-4 space-y-4 '>
                {users.map((u)=>{
                    const activity=userActivitys.get(String(u.ClerkID))
                    const isplaying=activity&&activity!=="Idle"
                    return(
                        <div className='cursor-pointer hover:bg-zinc-800/50 p-3 rounded-md transition-colors group' key={u._id}>
                            <div className='flex items-start gap-3 '>
                                <div className='relative'>
                                    <Avatar className='size-10 border border-zinc-800'>
                                        <AvatarImage src={u.imageUrl} alt={u.fullname}></AvatarImage>
                                        <AvatarFallback>{u.fullname[0]}</AvatarFallback>
                                        
                                    </Avatar>
                                    <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-zinc-900
                                                    ${onlineUsers.has(String(u.ClerkID))?"bg-green-500":"bg-zinc-500"} `}
                                                    aria-hidden='true'></div>
                                </div>
                                {/*Nos quedamos aqui */}
                                    <div className="flex-1 min-w-0">
                                        <div className='flex items-center gap-2'>
                                            <span className='font-medium text-sm text-white'>{u.fullname}</span>
                                            {isplaying&&
                                                <Music className='size-3.5 text-emerald-400 shrink-0'></Music>
                                            }
                                        </div>
                                        {isplaying?
                                        (
                                            <div className="mt-1">
                                                <div className='text-sm text-white font-medium truncate'>
                                                  {activity.replace("Escuchando","").split(" by ")[0]}
                                                </div>
                                            <div className='text-xs text-zinc-400 truncate'> {activity}</div>
                                            </div>
                                        )
                                        :(
                                            <div className='mt-1 text-xs text-zinc-400'>Ninguna Cancion</div>
                                        )
                                        }
                                    </div>                
                                
                            </div>
                            
                        </div>
                    )
                })}
            </div>
        </ScrollArea>
       </div>
    </>
  )
}
const LoginPromt=()=>(
    <div className='h-full flex flex-col items-center justify-center p-6 text-center space-y-4'>
        <div className="relative">
            <div
            className='absolute -inset-1 bg-gradient-to-br from-emerald-500 to-sky-500 rounded-full blur-lg
            opacity-75 animate-pulse'
            aria-hidden='true'
            ></div>            
            <div className='relative bg-zinc-900 rounded-full p-4'>
                <HeadphonesIcon className='size-8 text-emerald-400' ></HeadphonesIcon>
            </div>
            
        </div>
        <div className='space-y-2 max-w-[250px]'>
            <h3 className='text-lg font-semibold text-white'>See What Friends Are Playing</h3>
            <p className='text-sm text-zinc-400'>Login to discover what musci your friends are enjoying rigth now   </p>
        </div>
    </div>
    
)