# Voice Assistant Demo Chrome Extension

This simple voice assistant takes voice commands to follow links, summarize page (with instructions), and search google.

It is not meant as a service, but just a demo on how to create such a tool.

Built with [crxjs.dev](https://crxjs.dev).

## Setup

1. Clone this repo

2. Run

```
npm i
```

3. Rename .env.sample to .env and enter your OpenAI API key

4. Run

```
npm run dev
```

4. Load the _dist_ folder as an unpacked extension in Chrome (or a chromium based browser)
