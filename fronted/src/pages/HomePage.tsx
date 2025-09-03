import { useEffect } from "react";
import { TopBar } from "../components/TopBar";
import { useMusicStore } from "../store/useMusicStore";
import SectionFeatured from "./HomeComponents/SectionFeatured";
import { ScrollArea } from "../components/ui/scroll-area";
import SectionGrid from "./HomeComponents/SectionGrid";
import { usePlayerStore } from "../store/usePlayerStore";


export default function HomePage() {
  
  const {featuredSongs,fetchFeatureSongs,
        isLoading,
        fectchTrendingSongs,trendingForYouSongs,
        fectchMadeForYou,madeForYouSongs}=useMusicStore()
  useEffect(()=>{
    fetchFeatureSongs()
    fectchTrendingSongs()
    fectchMadeForYou()
  },[fetchFeatureSongs,fectchTrendingSongs,fectchMadeForYou])
  const {initializeQueue}=usePlayerStore()
  useEffect(()=>{
    if(madeForYouSongs.length>0 && featuredSongs.length>0 && trendingForYouSongs.length>0){
      const allsongs=[...featuredSongs,...madeForYouSongs,...trendingForYouSongs]
      initializeQueue(allsongs) 
    }
  },[initializeQueue,madeForYouSongs,trendingForYouSongs,featuredSongs])
  return (
   <>
   <div className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
    <TopBar></TopBar>
   <ScrollArea className="h-[calc(100vh-180px)]">
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Good Afternoon</h1>
     <SectionFeatured></SectionFeatured>
    
    <div className="space-y-8">
      <SectionGrid title={"Made for you"} songs={madeForYouSongs} isLoading={isLoading}></SectionGrid>
      <SectionGrid title={"Trending"} songs={trendingForYouSongs} isLoading={isLoading}></SectionGrid>      
    </div>
    </div>
   </ScrollArea>
   </div>
   </>
  )
}
