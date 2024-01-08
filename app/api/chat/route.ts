import { notesIndex } from "@/lib/db/pinecone"
import openai, { getEmbedding } from "@/lib/openai"
import { auth } from "@clerk/nextjs"
import { ChatCompletionMessage } from "openai/resources/index.mjs"
import prisma from "@/lib/db/prisma"
import { OpenAIStream, StreamingTextResponse } from "ai"
export const POST = async (req: Request) => {
    try {
        const body = await req.json()
        const messages: ChatCompletionMessage[] = body.messages
        const messageTurnCate = messages.slice(-6)
        const embedding = await getEmbedding(
            messageTurnCate.map((message) => message.content).join("\n")
        )
        const { userId } = auth()
        const vectorQueryResponse = await notesIndex.query({
            vector: embedding,
            topK: 30,
            filter: {
                userId
            }
        })

        const releventNotes = await prisma.note.findMany({
            where: {
                id: {
                    in: vectorQueryResponse.matches.map((note) => note.id)
                }
            }

        })
        console.log(releventNotes, 'releventNotes');
        const systemMessege: ChatCompletionMessage = {
            role: "assistant",
            content: "You are an ai assistant. You are helpful, creative, clever, and very friendly." +
                releventNotes.map((note) => `Title : ${note.title}\n\nContent:\n${note.content}`).join("\n\n"),
        }
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            stream: true,
            messages: [systemMessege, ...messageTurnCate],
        })

        const stream = OpenAIStream(response)
        return new StreamingTextResponse(stream)
    } catch (error) {
        console.log(error);
        return Response.json({ error: "Invalid request" }, { status: 400 });
    }
}