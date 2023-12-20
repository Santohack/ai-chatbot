import { auth } from '@clerk/nextjs'
import prisma from '@/lib/db/prisma'
import { Metadata } from 'next'
import React from 'react'
export const metadata: Metadata = {
    title: 'Notes',
}
const NotesPage = async() => {
  const {userId} = auth()
  if(!userId) throw new Error('user not found')
  const allNotes = await prisma.note.findMany({
    where:{
      userId
    }
  })
  return (
    <div>{JSON.stringify(allNotes)}</div>
  )
}

export default NotesPage