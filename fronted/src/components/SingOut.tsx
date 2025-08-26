import { useSignIn } from '@clerk/clerk-react'
import React from 'react'
import { Button } from './ui/button'

export default function SingOut() {
  const {signIn,isLoaded}=useSignIn()
  if(!isLoaded){
    return null
  }
  const signInwithGoogle=()=>{
    signIn.authenticateWithRedirect({
        strategy:'oauth_google',
        redirectUrl:"/sso-callback",
        redirectUrlComplete:"/auth"
    })
  }
  return <Button  onClick={signInwithGoogle} variant={'secondary'} className='w-full text-white border-zinc-50 h-11'>
    Continue with Google
  </Button>
}
