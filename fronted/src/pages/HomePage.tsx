import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Button } from '../components/ui/button';
export default function HomePage() {
  return (
   <>
   <header>
      
      <SignedOut>
        <SignInButton>
          <Button variant={'outline'}>Sing IN</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
   </>
  )
}
