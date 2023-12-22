import { auth } from '@clerk/nextjs'
import prisma from '@/lib/db/prisma'
import { Metadata } from 'next'
import React from 'react'
import Notes from '@/components/Notes'
export const metadata: Metadata = {
  title: 'Notes',
}
const NotesPage = async () => {
  const { userId } = auth()
  if (!userId) throw new Error('user not found')
  const allNotes = await prisma.note.findMany({
    where: {
      userId
    }
  })
  return (
    <>

      <div className='gap-3 grid sm:grid-cols-2 lg:grid-cols-3'>
        {
          allNotes.map((note) => (
            <Notes key={note.id} note={note} />
          ))
        }


      </div>

      {
        allNotes.length === 0 && (
         <div className='p-4 gap-5'>
           <p className='text-center flex items-center font-bold justify-center'>No notes found</p>
         </div>
        )
      }
    </>

  )
}

export default NotesPage