"use client"
import { NoteSchema, noteSchema } from '@/lib/validation/note'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from './ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import ButtonLoading from './ui/button-loading'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { note } from '@prisma/client'


interface AddNoteDialogButtonProps {
  open: boolean,
  setOpen: (open: boolean) => void,
  noteEdit?:note

}
const AddNoteDialogButton = ({ open, setOpen,noteEdit }: AddNoteDialogButtonProps) => {
  const [deleteLoading, setDeleteLoading] = React.useState(false)
 const router = useRouter()
  const form = useForm<NoteSchema>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: noteEdit?.title||'',
      content: noteEdit?.content|| '' 
    }
  })

  const onSubmit = async (input: NoteSchema) => {
    try {
    if(noteEdit){
const response = await fetch(`/api/notes`,{
  method: 'PATCH',
  body:JSON.stringify({
    id:noteEdit.id,
    ...input
  })
})

if(!response.ok) throw new Error('Failed to update note')
    }
    else{
      const response = await fetch(`/api/notes`,{
      method: 'POST',
      body:JSON.stringify(input),
    
    })
    if(!response.ok) throw new Error('Failed to add note')
    form.reset()
 
    }
    router.refresh()
    setOpen(false)
    toast(`Note ${noteEdit?'updated':'added'} successfully`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
   } catch (error) {
    toast.error('Failed to add note')
    console.error(error);
    
   }
  }

  const deleteNote = async ()=>{
 
    if(!noteEdit) return
    const confirmDelete = window.confirm('Are you sure you want to delete this note?');
    if(!confirmDelete) return
    setDeleteLoading(true)
    try {
      const response = await fetch(`/api/notes`,{
        method: 'DELETE',
        body:JSON.stringify({
          id:noteEdit .id
        })
      })
      if(!response.ok)
        throw new Error('Failed to delete note')
        router.refresh()
    setOpen(false)
      toast(`Note deleted successfully`, {
        
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

    } catch (error) {
      toast.error('Failed to add note')
      console.error(error);
    }
    finally{
      setDeleteLoading(false)
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          Add Note
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note Title</FormLabel>
                  <FormControl>
                    <Input placeholder='note title' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
            control={form.control}
            name="content"
            render={({field})=>(
              <FormItem>
                <FormLabel> Note Content</FormLabel>
                <FormControl>
                  <Textarea placeholder='note content' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} 
            />
            <DialogFooter className='flex items-center justify-between gap-2'>

              {
                noteEdit &&(
                  <ButtonLoading
                  variant={'destructive'}
                  disabled={form.formState.isSubmitting}
                  type='button'
                  loading={deleteLoading}
                  onClick={deleteNote}
                  >
                    Delete Note
                  </ButtonLoading>
                )
              }
            <ButtonLoading type='submit' disabled={deleteLoading} loading={form.formState.isSubmitting}>
             {form.formState.isSubmitting 
             ? noteEdit?'Updating ...':'Adding ...'
             :noteEdit?'Update Note':'Add Note'
             }
            </ButtonLoading>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddNoteDialogButton