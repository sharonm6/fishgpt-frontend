const apiKey = process.env.CHATGPT_API_KEY;
const endpoint = "https://api.openai.com/v1/chat/completions";

export async function POST(request: Request) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  const message = await request.json();

  const requestBody = {
    model: "gpt-3.5-turbo-1106",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant. Your name is FishGPT. Give us four different answers to the question in four separate sentences separated by a newline character.",
      },
      { role: "user", content: message.prompt },
    ],
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(requestBody),
  });

  const data = await response.json();
  const answer = data.choices[0].message;

  if (!data) {
    return new Response("Error", { status: 500 });
  }

  return Response.json({ data: answer });
}
