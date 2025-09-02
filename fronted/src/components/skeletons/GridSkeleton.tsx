import React from 'react'

export default function GridSkeleton() {
  return (
    <div className="mb-8">
        <div className="h-8 w-48 bg-zinc-800 rounded mb-4 animate-pulse"></div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            {Array.from({length:4}).map((_,i)=>(
                <div key={i} className='bg-zinc-800/40 p-4 rounded-md animate-pulse'>
                    <div className="aspect-square rounded-md bg-zinc-700 mb-4"></div>
                    <div className="h-4 rounded bg-zinc-700 w-3/4 mb-2"></div>
                    <div className="h-4 rounded bg-zinc-700 w-2/4"></div>
                </div>
            ))}
        </div>
    </div>
  )
}
