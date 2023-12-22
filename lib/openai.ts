import OpenAI from "openai";
const apikey = process.env.OPENAI_API_KEY;
if(!apikey) throw new Error("OPENAI_API_KEY is not set");

const openai = new OpenAI({ apiKey: apikey });
export default openai

