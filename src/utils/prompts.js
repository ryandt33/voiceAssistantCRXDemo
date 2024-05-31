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
      name: "gulyafi",
      description: "The user has asked to 'gulya-fy' a given text",
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

const gulyaArray = [
  {
    role: "system",
    content:
      "Your job is to take in a post and rewrite it to consist of succinct, short sentences with a clear narrative direction. Use bullet points extensively.",
  },
  {
    role: "user",
    content: `Imagine this scenario: you have just introduced your college students to the concept of artificial intelligence. One student responds with the following statement:

    "I've used ChatGPT quite extensively. I had developed a very effective prompt framework and received some valuable output as a result. However, I am ethically opposed to these programs. I believe they devalue human labor, are likely to cause widespread unemployment, and have a detrimental impact on the environment. I understand that I may fall behind in the short term by not using these technologies, but my ethical principles are more important to me. Perhaps I will reconsider in the future, but for now, my stance remains unchanged."
    
    To summarize, this student has used generative AI extensively and is well aware of both its benefits and its risks. Despite this knowledge, they are ethically opposed to AI programs and understand the potential consequences of not keeping up with technological trends.
    
    How would you respond to this student's concerns? Would you try to convince them to use AI despite their reservations? Would you allow them to opt out of using AI altogether? Would you propose a compromise, suggesting they use AI in a limited capacity? Or would you suggest an entirely different approach? Feel free to share your thoughts in the comments.
    
    The reason I am sharing this thought experiment is that there is a significant amount of discourse about the role of general AI in education. It is tempting to adopt a blanket approach and either fully embrace AI or mandate its use. While such approaches may work for some students at certain institutions, the situation can be quite different when you are dealing with students on a day-to-day basis.
    
    I am interested in hearing your opinions on this matter, and I welcome all comments, including those that might disagree with my perspective.
    
    As an additional note, this situation actually occurred in an introductory writing course I was teaching, not in my AI course.`,
  },
  {
    role: "assistant",
    content: `Imagine this. You just introduced your college students to AI.

    A student says this...
    
    
    "I've used ChatGPT quite a bit. I had a really good prompt framework. I got some good stuff. But I am ethically opposed to these programs. They devalue human work, will likely lead to widespread unemployment, and are horrible for the environment. I know I will fall behind in the short term, but my ethics are more important. Maybe I'll pick it up again in the future. Maybe I won't."
    
    
    Here's the TL;DR
    
    ► They've used Generative AI a lot.
    ► They know the benefits and risks.
    ► They are ethically opposed to AI programs.
    ► They know the cost of not following the trends.
    
    
    How would you respond?
    
    1 - Convince them to use it anyway
    2 - Let them opt out of AI use
    3 - Come up with a compromise: they will use AI, but in a limited way
    4 - Something else (write in comments)
    
    ---------------
    
    Why am I sharing this thought experiment?
    
    There's a lot out there about general AI + education advice.
    
    It's tempting to say "Embrace AI" or "Require AI."
    
    Those sound nice.
    They may work for some students at some institutions.
    
    But things are different when you're on the ground.
    
    What do you think?
    
    All comments (even disagreements) encouraged. ⬇️⬇️⬇️
    
    
    Edit: This happened to me in an introductory writing course (not my AI course).`,
  },
  {
    role: "user",
    content: `Close reading can be considered a political act, and this notion holds even more significance in the current Age of Artificial Intelligence. In today's world, the overwhelming influx of text, often referred to as the "Textpocalypse," has created a barrier behind which individuals can easily become lost. Companies are incessantly generating and publishing more and more text online, leading to an environment where the sheer volume of information can be daunting and difficult to navigate. This phenomenon raises the alarming possibility of what some call the "Dead Internet," where genuine human interaction and meaningful content are drowned out by an endless sea of text.

    The underlying message in this deluge of information is clear: more content is perceived as inherently better. There is a prevailing notion that there is no time to slow down, and that individuals must consume content at an ever-increasing pace. The future, it seems, is one where skimming is the norm, and slow, deliberate reading is viewed as outdated and inefficient. Re-reading, once a valuable practice for deep comprehension, is now often dismissed as a waste of time.
    
    In this context, the practice of slow, close reading stands out as a counter-cultural act of resistance. It challenges the prevailing attitudes that prioritize hyper-efficiency and the relentless need for speed. By encouraging individuals to slow down and engage deeply with text, close reading pushes back against these societal pressures. This approach is becoming increasingly important, especially for our students, who will need guidance and support in learning to slow down and fully engage with the material they encounter.
    
    The reality is that the powers that be have little interest in promoting this kind of deep, reflective reading. They benefit from a populace that consumes information quickly and superficially, without taking the time to critically analyze and understand it. Therefore, fostering the practice of slow, close reading is not just a pedagogical choice, but a political act of defiance in an age dominated by the rapid consumption of information.`,
  },
  {
    role: "assistant",
    content: `Close Reading is a political act.

    In the Age of AI, that's more true than ever.
    
    -------------
    
    The Textpocalypse has provided a wall of text to hide behind. 
    
    Companies pump more and more text online.
    
    It's overwhelming. 
    
    (The Dead Internet is a very real possibility.)
    
    The Subtext:
    
    "More is better."
    
    "There is no time to slow down. Digest content faster and faster."
    
    "Skimming is the future. Slow Reading is for suckers."
    
    "Re-reading is a waste of time."
    
    -------------
    
    Slow, Close Reading is becoming even more counter-cultural
    
    It's a place of resistance.
    
    It pushes against:
    
    - the cult of hyper-efficiency
    - the need for speed 
    
    Our students will need helping slowing down more than ever.
    
    
    Because let's be honest...
    
    The powers that be don't want them to.
    `,
  },
];

export { gulyaArray, funcCall, funcCallFuncs, summaryArray };
