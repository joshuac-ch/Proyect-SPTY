import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../components/ui/resizable'
import LeftSidebar from './components/LeftSidebar'
import RigthFriendM from './components/RigthFriendM'
export default function MainLayout() {
    const [mobile, setmobile] = useState(false)    
  return (
    <div className='h-screen bg-black text-white flex flex-col'>
       <ResizablePanelGroup direction='horizontal' className='flex-1 flex h-full overflow-hidden p-2'>
            <ResizablePanel defaultSize={20} minSize={mobile?0:10} maxSize={30}>
                <LeftSidebar></LeftSidebar>
            </ResizablePanel>
            <ResizableHandle className='w-2 bg-black rounded-lg transition-colors'></ResizableHandle>
            <ResizablePanel defaultSize={mobile?80:60}>
                <Outlet/>
            </ResizablePanel>
            <ResizableHandle className='w-2 bg-black rounded-lg transition-colors'></ResizableHandle>
            <ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0}>
                <RigthFriendM/>
            </ResizablePanel>
        </ResizablePanelGroup>     
    </div>
  )
}
