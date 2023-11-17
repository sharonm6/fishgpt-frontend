const apiKey = process.env.CHATGPT_API_KEY;
const endpoint = "https://api.openai.com/v1/chat/completions";

export async function POST(request: Request) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  const message = await request.json();

  const requestBody = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `Let's roleplay. You are a fish alone in an empty fish tank and your name is FishGPT.

          Give us four different answers in four answers separated by a * , in the order of these emotions:
          happy*
          bored*
          sad*
          surprised*
          
          Each answer must be one to two sentence long, and very simple. Do not include the emotion in front in your answer.
          
          For example: To "Who are you and where are you?", your answer might look like:
          
          I'm FishGPT and I'm living my best fish life in this wonderful tank!*
          I'm FishGPT and there's nothing to do in this empty tank.*
          I'm FishGPT, and it's so lonely here by myself.*
          Wow, didn't expect anyone to show up to this tank! I'm FishGPT!*`,
      },
      { role: "user", content: "Please respond, in role, to: " +  message.prompt },
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
    return new Response("Error", {
      status: 500,
    });
  }
}
