import { SignIn } from '@clerk/nextjs'
import { Metadata } from 'next'
import React from 'react'
export const metadata: Metadata = {
    
    title: 'Sign in',
}
const page = () => {
    return (
        <div className='flex h-screen items-center justify-center'>

            <SignIn appearance={{ variables: { colorPrimary :'#0f172A'} }} />
        </div>
    )
}

export default page