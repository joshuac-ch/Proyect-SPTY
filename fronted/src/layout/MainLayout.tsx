
import { Outlet } from 'react-router-dom'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../components/ui/resizable'
import LeftSidebar from './components/LeftSidebar'
import RigthFriendM from './components/RigthFriendM'
import AudioPlayer from './components/AudioPlayer'
import PlayBackControllers from './components/PlayBackControllers'
import { useEffect, useState } from 'react'
export default function MainLayout() {
    const [mobile, setmobile] = useState(false)
    useEffect(()=>{
        const checkMobile=()=>{
            setmobile(window.innerWidth<768)
        }  
        checkMobile()
        window.addEventListener('resize',checkMobile)
        return ()=>window.removeEventListener('resize',checkMobile) 
    },[]) 
  return (
    <div className='h-screen bg-black text-white flex flex-col'>
       <ResizablePanelGroup direction='horizontal' className='flex-1 flex h-full overflow-hidden p-2'>
            <AudioPlayer></AudioPlayer>
            <ResizablePanel defaultSize={20} minSize={mobile?0:10} maxSize={30}>
                <LeftSidebar></LeftSidebar>
            </ResizablePanel>
            <ResizableHandle className='w-2 bg-black rounded-lg transition-colors'></ResizableHandle>
            <ResizablePanel defaultSize={mobile?80:60}>
                <Outlet/>
            </ResizablePanel>
            
           {!mobile&&(
            <>
             <ResizableHandle className='w-2 bg-black rounded-lg transition-colors'></ResizableHandle>
            <ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0}>
                <RigthFriendM/>
            </ResizablePanel>
            </>
           )}

        </ResizablePanelGroup>
        <PlayBackControllers></PlayBackControllers>     
    </div>
  )
}
