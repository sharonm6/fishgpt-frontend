import { NextResponse } from "next/server";

const apiKey = process.env.CHATGPT_API_KEY;
const endpoint = "https://api.openai.com/v1/engines/davinci/completions";

export async function POST(request: Request) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  const message = await request.json();

  const requestBody = {
    prompt: message.prompt,
    max_tokens: 5,
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(requestBody),
  });

  const data = await response.json();
  console.log("RESPONSE: ", data);

  if (!data) {
    return new Response("Error", { status: 500 });
  }

  return NextResponse.json({ data });
}
