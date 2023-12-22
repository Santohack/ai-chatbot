"use client"
import { note as NoteModel } from '@prisma/client'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import AddNoteDialogButton from './AddNoteDialogButton'


interface NotesProps {
    note: NoteModel
}
const Notes = ({note}: NotesProps) => {
    const [showEditDialog, setShowEditDialog] = React.useState(false)
    const wasUpdated = note.updatedAt >note.creatAt
    const createdUpdatedTimeStamp = (
        wasUpdated ?note.updatedAt :note.creatAt
    ).toDateString()
  return (
    <>
  
    <Card className='curser-pointer hover:shadow-lg transition-shadow' onClick={()=>setShowEditDialog(true)}>
        <CardHeader>
            <CardTitle>{note.title}</CardTitle>
            <CardDescription>
                {createdUpdatedTimeStamp}
                {wasUpdated && ' (updated)'}
            </CardDescription>
        </CardHeader>
        <CardContent>
            <p className='whitespace-pre-line'>{note.content}</p>
        </CardContent>
    </Card>
    <AddNoteDialogButton
    open={showEditDialog}
    setOpen={setShowEditDialog}
    noteEdit={note}
    />
    </>
  )
}

export default Notes