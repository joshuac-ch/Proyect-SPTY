
import { useMusicStore } from '../../store/useMusicStore'
import FeaturedSkeleton from '../../components/skeletons/FeaturedSkeleton'
import PlayButton from './PlayButton'

export default function SectionFeatured() {
    const {isLoading,error,featuredSongs}=useMusicStore()
    
    if(isLoading) return <FeaturedSkeleton/>
    if(error) return <p className='text-read-500 mb-4 text-lg'>{error}</p>
    return (
    <>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
            {featuredSongs.map((s)=>(
                <div key={s._id}
                className='flex items-center bg-zinc-800/50 rounded-md overflow-hidden
                hover:bg-zinc-700/50 transition-colors group cursor-pointer relative'>
                    <img src={s.imageURL} className='w-16 sm:w-20 h-16 sm:h-20 object-cover
                    flex-shrink-0' alt={s.title} />
                    <div className="flex-1 p-4">
                        <p className="font-medium truncate">{s.title}</p>
                        <p className="text-sm text-zinc-400 truncate">{s.artist}</p>

                    </div>
                    <PlayButton song={s}></PlayButton>
                </div>
            ))}
        </div>
        
    </>
  )
}
