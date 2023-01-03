import { Button } from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

export default function hello() {
    
  return (
    <><h1>Login Successful !!</h1><h2> Welcome Back</h2>
    <Button colorScheme="green" onClick={() => signOut()}>Sign Out</Button>
    </>
  )
}
