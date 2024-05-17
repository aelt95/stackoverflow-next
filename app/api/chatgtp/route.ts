import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
async function getGroqChatCompletion(question: any) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: question,
      },
    ],
    model: "llama3-8b-8192",
  });
}

export const POST = async (request: Request) => {
  const { question } = await request.json();
  try {
    const response = await getGroqChatCompletion(question);
    const aiReply = response.choices[0]?.message?.content;
    return NextResponse.json({ aiReply });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
