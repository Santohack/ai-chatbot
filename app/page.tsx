import Image from 'next/image'
import logo from '../public/logo.png'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
export default function Home() {
  const { userId } = auth()
  if (userId) redirect('/notes')
  return (
    <main className="flex flex-col item-center h-screen items-center justify-center gap-5">
      <div className='flex items-center gap-4'>
        <Image
          src={logo}
          alt="logo"

        />
        <span className='font-bold text-4xl lg:text-5xl'>Keep</span>

      </div>
      <p className='max-w-prose text-center '>
        An Interactive Chat Bot for your Notes and Tasks
      </p>
      <Button size={'lg'} asChild>
        <Link href="/notes">Get Started
        </Link>
      </Button>
    </main>
  )
}
