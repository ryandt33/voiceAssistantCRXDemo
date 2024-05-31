import "./App.css";
import { useState } from "react";
import Recorder from "./Recorder";

function App() {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  return (
    <div className="App">
      {output && (
        <div
          style={{
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            color: "black",
            textAlign: "left",
            fontSize: "16px",
            padding: "20px",
            borderRadius: "10px",
            zIndex: 10000,
            maxHeight: "80vh",
            overflowY: "scroll",
          }}
        >
          <h1>Output</h1>
          <p
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
            }}
            onClick={() => setOutput("")}
          >
            X
          </p>
          <div>
            {output.split("\n").map((o, i) => (
              <p key={i}>{o}</p>
            ))}
          </div>
        </div>
      )}
      {loading && (
        <div
          className="loading"
          style={{
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "30px",
            color: "black",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            zIndex: 10000,
          }}
        >
          Loading...
        </div>
      )}
      <Recorder setLoading={setLoading} setOutput={setOutput} />
    </div>
  );
}

export default App;
