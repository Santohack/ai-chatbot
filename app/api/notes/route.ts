import { noteSchema } from "@/lib/validation/note"
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db/prisma"
export const POST = async (req:Request)=>{
    try {
        const body = await req.json()

        const parseResult = noteSchema.safeParse(body)
        if(!parseResult.success){
            console.log(parseResult.error);
            return Response.json({error:parseResult.error},{status:400})
        }
        const {title,content} = parseResult.data
        const {userId} = auth()
        if(!userId){
            return Response.json({error:'Unauthorized'},{status:401})
        }

        const note = await prisma.note.create({
            data:{
                title,
                content,
                userId
            }
        })

        return Response.json({note},{status:200})
    } catch (error) {
        return Response.json({error:'internal server'},{status:500})
        
    }
}