import{ Pinecone }  from"@pinecone-database/pinecone"
const apiKey = process.env.PINECONE_API_KEY;
if(!apiKey) throw new Error("PINECONE_API_KEY is not set");

const pinecone = new Pinecone({
    apiKey: apiKey,
    environment: "gcp-starter",
})

export const notesIndex = pinecone.Index("chatgpt-ai")