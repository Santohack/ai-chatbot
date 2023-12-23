import OpenAI from "openai";
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) throw Error("OPENAI_API_KEY is not set");

const openai = new OpenAI({ apiKey });
export default openai


/**
 * Retrieves the embedding of a given text using OpenAI's text embedding model.
 * 
 * @param {string} text - The input text to retrieve the embedding for.
 * @returns {Promise<number[]>} The embedding of the input text.
 * @throws {Error} Throws an error if the embedding is not found.
 */
export async function getEmbedding(text: string) {
    const response = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: text
    })
    const embedding = response.data[0].embedding
    if (!embedding) throw Error("embedding not found")
    console.log(embedding);
    return embedding
}
