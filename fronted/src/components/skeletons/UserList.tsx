import React from 'react'

export default function UserList() {
  return Array.from({length:5}).map((_,i)=>(
    <div key={i} className="flex items-center justify-center lg:justify-center rounded-full animate-pulse p-3 gap-3">
        <div className="w-12 h-12 bg-zinc-800 rounded-full">           
        </div>
        <div className='flex-1  hidden md:block space-y-2'>
                <div className="h-4 bg-zinc-800 rounded animate-pulse w-24"></div>
                <div className="h-3 bg-zinc-800 rounded animate-pulse w-32"></div>
        </div>
    </div>
  )) 
}
