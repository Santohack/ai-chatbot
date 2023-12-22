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