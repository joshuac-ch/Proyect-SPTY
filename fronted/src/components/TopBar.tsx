import { SignedIn, SignedOut,  SignOutButton, UserButton } from '@clerk/clerk-react'
import { LayoutDashboardIcon } from 'lucide-react'

import { Link } from 'react-router-dom'
import SingOut from './SingOut'
import { UseAuthStore } from '../store/useAuthStore'

export const TopBar=()=>{
    const {isAdmin}=UseAuthStore()  
      
  return (
    <div className='flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10'>
        <div className='flex gap-2 items-center'>
            Spotify
        </div>
        <div className='flex items-center gap-4'>
            {isAdmin&&(
                <Link to={"/admin"}>
                    <LayoutDashboardIcon className='size-4 mr-2'>
                        Admin Dashboard
                    </LayoutDashboardIcon>
                </Link>
            )}           
            <SignedIn>
                <SignOutButton></SignOutButton>
            </SignedIn>
            
            <SignedOut>
                <SingOut></SingOut>
            </SignedOut>
            <UserButton></UserButton>
        </div>
    </div>
  )
}
