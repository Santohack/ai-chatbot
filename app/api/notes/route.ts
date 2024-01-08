// import { noteDeleteSchema, noteSchema, noteUpdateSchema } from "@/lib/validation/note"
// import { auth } from "@clerk/nextjs";
// import prisma from "@/lib/db/prisma"
// import { getEmbedding } from "@/lib/openai";
// import { notesIndex } from "@/lib/db/pinecone"
// import { title } from "process";


// const getEmbaddingForNotes = async (title: string, content: string | undefined) => {
//     return getEmbedding(title + "\n\n" + content ?? "");
// }

// export const POST = async (req: Request) => {
//     try {
//         const body = await req.json()

//         const parseResult = noteSchema.safeParse(body)
//         if (!parseResult.success) {
//             console.log(parseResult.error);
//             return Response.json({ error: parseResult.error }, { status: 400 })
//         }
        
//         const { title, content } = parseResult.data
//         const { userId } = auth()
//         if (!userId) {
//             return Response.json({ error: 'Unauthorized' }, { status: 401 })
//         }
        
//         const embedding = await getEmbaddingForNotes(title, content)
//         const note = await prisma.$transaction(async (tx) => {
//             const createdNote = await tx.note.create({
//                 data: {
//                     title,
//                     content,
//                     userId
//                 },
//             })

//             await notesIndex.upsert([{
//                 id: createdNote.id,
//                 values: embedding,
//                 metadata: { userId }
//             }])
            
//             return createdNote
//         })

//         return Response.json({ note }, { status: 200 })
//     } catch (error) {
//         console.error('Error occurred:', error);
//         return Response.json({ error: 'Internal server error' }, { status: 500 })
//     }
// }


// export const PATCH = async (req: Request) => {
//     try {
//         const body = await req.json()
//         const parseResult = noteUpdateSchema.safeParse(body)
//         if (!parseResult.success) {
//             console.log(parseResult.error);
//             return Response.json({ error: parseResult.error }, { status: 400 })
//         }
//         const { id, title, content } = parseResult.data

//         const note = await prisma.note.findUnique({
//             where: {
//                 id
//             }
//         })

//         if (!note) {
//             return Response.json({ error: 'Note not found' }, { status: 404 })
//         }
//         const { userId } = auth()
//         if (!userId && userId !== note.userId) {
//             return Response.json({ error: 'Unauthorized' }, { status: 401 })
//         }

//         const embedding = await getEmbaddingForNotes(title, content)
//         const updateNote = await prisma.$transaction(async (tx) => {
//             const updated = await tx.note.update({
//                 where: {
//                     id
//                 },
//                 data: {
//                     title,
//                     content
//                 }
//             })
//             await notesIndex.upsert([{
//                 id,
//                 values: embedding,
//                 metadata: { userId }
//             }])
//             return updated
//         })
       
//         return Response.json({ updateNote }, { status: 200 })
//     } catch (error) {
//         console.log(error);
//         return Response.json({ error: 'internal server' }, { status: 500 })
//     }
// }

// export const DELETE = async (req: Request) => {
//     try {

//         const body = await req.json()
//         const parseResult = noteDeleteSchema.safeParse(body)
//         if (!parseResult.success) {
//             console.log(parseResult.error);
//             return Response.json({ error: parseResult.error }, { status: 400 })
//         }
//         const { id } = parseResult.data
//         const note = await prisma.note.findUnique({
//             where: {
//                 id
//             }
//         })

//         if (!note) {
//             return Response.json({ error: 'Note not found' }, { status: 404 })
//         }
//         const { userId } = auth()
//         if (!userId && userId !== note.userId) {
//             return Response.json({ error: 'Unauthorized' }, { status: 401 })
//         }

//        await prisma.$transaction(async (tx) => {
//             await tx.note.delete({
//                 where: {
//                     id
//                 }
//             })
//             await notesIndex.deleteOne([id])
//        })
      
//         return Response.json({ message: 'Note deleted successfully' }, { status: 200 })
//     } catch (error) {
//         console.log(error);
//         return Response.json({ error: "internal server" }, { status: 500 })
//     }
// }



///normal crud opertion

import { noteDeleteSchema, noteSchema, noteUpdateSchema } from "@/lib/validation/note"
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db/prisma"
export const POST = async (req: Request) => {
    try {
        const body = await req.json()

        const parseResult = noteSchema.safeParse(body)
        if (!parseResult.success) {
            console.log(parseResult.error);
            return Response.json({ error: parseResult.error }, { status: 400 })
        }
        const { title, content } = parseResult.data
        const { userId } = auth()
        if (!userId) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const note = await prisma.note.create({
            data: {
                title,
                content,
                userId
            }
        })

        return Response.json({ note }, { status: 200 })
    } catch (error) {
        return Response.json({ error: 'internal server' }, { status: 500 })

    }
}

export const PATCH = async (req: Request) => {
    try {
        const body = await req.json()
        const parseResult = noteUpdateSchema.safeParse(body)
        if (!parseResult.success) {
            console.log(parseResult.error);
            return Response.json({ error: parseResult.error }, { status: 400 })
        }
        const { id, title, content } = parseResult.data
        const note = await prisma.note.findUnique({
            where: {
                id
            }
        })

        if (!note) {
            return Response.json({ error: 'Note not found' }, { status: 404 })
        }
        const { userId } = auth()
        if (!userId && userId !== note.userId) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 })
        }
        const updateNote = await prisma.note.update({
            where: {
                id
            },
            data: {
                title,
                content
            }
        })
        return Response.json({ updateNote }, { status: 200 })
    } catch (error) {
        console.log(error);
        return Response.json({ error: 'internal server' }, { status: 500 })
    }
}

export const DELETE = async (req: Request) => {
    try {

        const body = await req.json()
        const parseResult = noteDeleteSchema.safeParse(body)
        if (!parseResult.success) {
            console.log(parseResult.error);
            return Response.json({ error: parseResult.error }, { status: 400 })
        }
        const { id } = parseResult.data
        const note = await prisma.note.findUnique({
            where: {
                id
            }
        })

        if (!note) {
            return Response.json({ error: 'Note not found' }, { status: 404 })
        }
        const { userId } = auth()
        if (!userId && userId !== note.userId) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 })
        }
        await prisma.note.delete({
            where: {
                id
            }
        })
        return Response.json({ message: 'Note deleted successfully' }, { status: 200 })
    } catch (error) {
        console.log(error);
        return Response.json({ error: "internal server" }, { status: 500 })
    }
}

