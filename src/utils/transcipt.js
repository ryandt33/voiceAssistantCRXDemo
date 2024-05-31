const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const genTranscript = async (b64Audio) => {
  // first, conver the b64 audio to a webm file

  // Convert base64 to raw binary data
  const byteCharacters = atob(b64Audio.split(",")[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  // Create a blob, then a file from the blob
  const blob = new Blob([byteArray], { type: "audio/webm" });
  const file = new File([blob], "audio.webm", { type: "audio/webm" });

  const formData = new FormData();

  console.log(file);

  formData.append("file", file, "audio.webm");
  formData.append("model", "whisper-1");
  console.log("calling whisper");

  const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: formData,
  });

  const json = await res.json();

  if (json?.text) {
    return json.text;
  }
};

export { genTranscript };
