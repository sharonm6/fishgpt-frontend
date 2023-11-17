const apiKey = process.env.CHATGPT_API_KEY;
const endpoint = "https://api.openai.com/v1/chat/completions";

export async function POST() {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  const requestBody = {
    model: "gpt-3.5-turbo-1106",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant. Your name is FishGPT. Generate a fun status blurb that is less than 5 words.",
      },
    ],
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    const answer = data.choices[0].message;
    return Response.json({ data: answer });
  } catch (e) {
    return new Response("Error", { status: 500 });
  }
}
