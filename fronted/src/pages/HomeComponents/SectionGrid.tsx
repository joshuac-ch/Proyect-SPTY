
import GridSkeleton from '../../components/skeletons/GridSkeleton'
import { Button } from '../../components/ui/button'
import type { Song } from '../../types'
type GridPomps={
    title:string,
    songs:Song[],
    isLoading:boolean
}
export default function SectionGrid({title,songs,isLoading}:GridPomps) {
   if(isLoading) return <GridSkeleton></GridSkeleton>  
   return (
   <>
    <div className='mb-8'>
        <div className="flex items-center justify-between mb-4">
            <h2 className='text-xl sm:text-2xl font-bold'>{title}</h2>
        
        <Button variant={'link'} className='text-sm text-zinc-400 cursor-pointer hover:text-white'>
            Show All
        </Button>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            {songs.map((s)=>{
                return(
                    <div className='bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer ' key={s._id}>
                        <div className='relative mb-4'>
                            <div className="aspect-square rounded-md shadow-lg overflow-hidden">
                                <img src={s.imageURL} 
                                className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ' 
                                alt={s.title} />
                            </div>
                        </div>
                        <h3 className='font-medium mb-2 '>{s.title}</h3>
                        <p className='text-sm text-zinc-400 '>{s.artist}</p>
                    </div>
                )
            })}
        </div>
    </div>
   </>
  )
}
