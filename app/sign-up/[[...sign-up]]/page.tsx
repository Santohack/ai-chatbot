import { SignUp } from '@clerk/nextjs'
import { Metadata } from 'next'
import React from 'react'
export const metadata: Metadata = {
    title: 'Sign Up',
}
const page = () => {
    return (
        <div className='flex h-screen items-center justify-center'>

            <SignUp appearance={{ variables: { colorPrimary :'#0f172A'} }} />
        </div>
    )
}

export default page