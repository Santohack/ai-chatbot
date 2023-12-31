"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import logo from '../../public/logo.png'
import { UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import AddNoteDialogButton from '@/components/AddNoteDialogButton'
import ThemeToggleButton from '@/components/ThemeToggleButton'
import {dark} from '@clerk/themes'
import { useTheme } from 'next-themes'
import AIChatButton from '@/components/AIChatButton'
const Navbar = () => {
  const [showAddNoteDialog,setShowAddNoteDialog] = useState(false)
  const {theme} = useTheme()
    return (
      <>
   
        <div className='p-4 shadow'>
            <div className='max-w-7xl mx-auto flex flex-wrap gap-3 items-center justify-between'>
                <Link href={"/notes"} className='flex items-center gap-1'>
                    <Image src={logo} width={50} height={50} alt="logo" />
                    <span className='font-bold'>keep</span>
                </Link>
              <div className='flex items-center gap-2'>
              <UserButton afterSignOutUrl="/"
              appearance={{
                baseTheme: theme === 'dark' ? dark : undefined,
                elements: {
                  avatarBox: {
                    width: "2.5rem",
                    height: "2.5rem",
                  },
                },
              }}
              />
              <ThemeToggleButton />
              <Button onClick={()=>setShowAddNoteDialog(true)}>
                <PlusIcon size={20} className='mr-2' />
                Add Note
              </Button>
              <AIChatButton />
              </div>
            </div>
        </div>
        <AddNoteDialogButton noteEdit={undefined} open = {showAddNoteDialog} setOpen={setShowAddNoteDialog}/>
        </>
    )
}

export default Navbar