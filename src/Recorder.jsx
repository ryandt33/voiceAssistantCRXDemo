import { useRef, useState, useEffect } from "react";
import { genTranscript } from "./utils/transcipt";
import { generalCall } from "./utils/chat";
import tools from "./utils/tools";
import { funcCall, funcCallFuncs } from "./utils/prompts";

const Recorder = ({ setLoading, setOutput }) => {
  const [listening, setListening] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioURL, setAudioURL] = useState("");

  const isListening = useRef(false);

  const startRecording = () => {
    const startTime = new Date().getTime();
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        isListening.current = true;
        const newMediaRecorder = new MediaRecorder(stream, {
          mimeType: "audio/webm",
        });
        setMediaRecorder(newMediaRecorder);

        let chunks = [];

        newMediaRecorder.ondataavailable = (e) => {
          chunks.push(e.data);
        };

        newMediaRecorder.onstop = (e) => {
          const blob = new Blob(chunks, { type: "audio/webm" });
          setAudioURL(URL.createObjectURL(blob));
          chunks = [];

          const reader = new FileReader();
          reader.readAsDataURL(blob);

          reader.onloadend = async () => {
            const base64Audio = reader.result;
            setLoading(true);

            const transcript = await genTranscript(base64Audio);

            console.log(transcript, funcCall, funcCallFuncs);

            const functionToCall = await generalCall(
              "gpt-3.5-turbo",
              funcCall,
              transcript,
              funcCallFuncs
            );

            console.log(functionToCall);

            if (!functionToCall?.name) return;

            try {
              const res = await tools[functionToCall.name](
                JSON.parse(functionToCall.arguments)
              );

              if (res) {
                setOutput(res);
              }
            } catch (error) {
              console.log(error);
            }

            setLoading(false);
          };
        };

        newMediaRecorder.start();
      })
      .catch((err) => console.log(err));
  };

  const stopRecording = () => {
    isListening.current = false;
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  useEffect(() => {
    if (listening && !isListening.current) {
      startRecording();
    } else if (!listening && isListening.current) {
      stopRecording();
    }
  }, [listening]);

  useEffect(() => {
    if (!audioURL) return;
  }, [audioURL]);

  return (
    <div
      style={{
        position: "fixed",
        right: "20px",
        bottom: "20px",
        width: "50px",
        height: "50px",
        borderRadius: "100%",
        backgroundColor: listening ? "#ff912f" : "#2d3696",
        zIndex: 1000,
        cursor: "pointer",
      }}
      onClick={() => {
        setListening(!listening);
      }}
    >
      <img
        src="https://house-demo.for.education/white-mic.svg"
        style={{
          width: "60%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
};

export default Recorder;
