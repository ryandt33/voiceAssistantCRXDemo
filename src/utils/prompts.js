const funcCall = [
  {
    role: "system",
    content:
      "The user has issued a voice command, your job is to call the appropriate function.",
  },
];

const funcCallFuncs = [
  {
    type: "function",
    function: {
      name: "follow_link",
      description: "The user requested to follow a link with given text",
      parameters: {
        type: "object",
        properties: {
          link: {
            type: "string",
            description: "The text of the link to follow",
          },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "summarize",
      description: "The user has requested to summarize the page",
      parameters: {
        type: "object",
        properties: {
          instructions: {
            type: "string",
            description:
              "The content that the user has asked to summarize (can be null)",
          },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "google_search",
      description: "The user has requested to search for a given query",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "The search query",
          },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "multiple_choice_test",
      description: "The user has requested to generate a multiple choice test",
      parameters: {
        type: "object",
        properties: {
          questions: {
            type: "string",
            description: "Five multiple choice questions",
          },
          answers: {
            type: "string",
            description: "The answers to the questions",
          },
        },
      },
    },
  },
];

const summaryArray = [
  {
    role: "system",
    content:
      "The user will send you an excerpt of text from the page. Your job is to summarize it. The user might also give you instructions about how to summarize the data. You can only output plain text, don't use any markup or formatting.",
  },
];

export { funcCall, funcCallFuncs, summaryArray };
