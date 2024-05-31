const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const generalCall = async (
  model,
  messageArray,
  userPrompt,
  tools = null,
  json = false
) => {
  console.log("calling OpenAI");
  const body = {
    messages: [
      ...messageArray,
      {
        role: "user",
        content: userPrompt,
      },
    ],
    max_tokens: 4096,
    stream: false,
    temperature: 0.8,
    model: model,
  };

  if (tools) {
    body.tools = tools;
  }
  if (json) {
    body.response_format = { type: "json_object" };
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const resJson = await res.json();

  console.log(resJson);

  if (tools) {
    const toolCall = resJson.choices[0].message.tool_calls[0].function;
    return toolCall;
  }
  const newText = resJson.choices[0].message.content;

  return newText;
};

const callOpenAI = async (html, websiteName) => {
  const body = JSON.stringify({
    messages: [
      {
        role: "system",
        content:
          "The user will pass in an array of HTML a tags, return ONLY the URL they request.",
      },
      {
        role: "user",
        content: `HTML:
        
        ${html}
        
        I want to click on the link that says "${websiteName}". Return the following JSON object:
        
        {
            "link": <link URL>
        }
        
        If there is no match, return null.`,
      },
    ],
    max_tokens: 4096,
    stream: false,
    temperature: 0.1,
    model: "gpt-4o",
    response_format: { type: "json_object" },
  });

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body,
  });

  const json = await res.json();

  console.log(json);

  const newText = json.choices[0].message.content;

  return newText;
};

export { callOpenAI, generalCall };
