"use client"
import { note as NoteModel } from '@prisma/client'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import AddNoteDialogButton from './AddNoteDialogButton'
import { Button } from './ui/button'
import { Edit2 } from 'lucide-react'


interface NotesProps {
    note: NoteModel
}
const Notes = ({note}: NotesProps) => {
    const [showEditDialog, setShowEditDialog] = React.useState(false)
    const [editbutton, setEditButton] = React.useState(false)
    const wasUpdated = note.updatedAt >note.creatAt
    const createdUpdatedTimeStamp = (
        wasUpdated ?note.updatedAt :note.creatAt
    ).toDateString()
  return (
    <>
  
    <Card className='cursor-pointer hover:shadow-lg transition-shadow'  onMouseEnter={() => setEditButton(true)}
        onMouseLeave={() => setEditButton(false)}  >
        <CardHeader>
           <div className='flex justify-between items-center flex-wrap'>
           <CardTitle>{note.title}</CardTitle>
        
         {editbutton &&(  <CardTitle><Button variant={'outline'}   onClick={()=>setShowEditDialog(true)}>
                <Edit2 className='mr-2 h-4 w-4'/>
                Edit
            </Button>
            
            </CardTitle>)}
    
           </div>
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