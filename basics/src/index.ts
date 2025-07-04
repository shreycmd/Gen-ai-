import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
async function main() {
  const res = await gemini.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "hi how are you?",
  });
  console.log(res.text);
}
main();
