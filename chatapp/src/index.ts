import { GoogleGenAI } from "@google/genai";

import dotenv from "dotenv";
dotenv.config();
const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
type Context = {
  role: string;
  parts: {
    text: string;
  }[];
}[];

const context: Context = [
  {
    role: "user",
    parts: [
      {
        text: "You are a helpful assistant who answers like a teacher. Let's begin",
      },
    ],
  },
];
async function chatCompletion() {
  try {
    const res = await gemini.models.generateContent({
      model: "gemini-1.5-flash",

      contents: context,
    });
    const reply = res.candidates?.[0]?.content?.parts?.[0];
    const role = "assistant";
    if (reply?.text) {
      context.push({ role: role, parts: [{ text: reply.text }] });
    }

    console.log("Smarty PAnts : ", res.text);
  } catch (error) {
    console.log("error", error);
  }
}
async function main() {
  const input = require("prompt-sync")({ sigint: true });

  while (true) {
    const uinput = input("User : ") as string;
    if (uinput.trim().toLowerCase() == "end") {
      console.log("exiting chat...");
      break;
    }
    context.push({
      role: "user",
      parts: [{ text: uinput }],
    });
    await chatCompletion();
  }
}
main();
