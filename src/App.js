import React, { useState, useEffect } from "react";
import WebPlayback from "./WebPlayback";
import Login from "./Login";
import "./App.css";
import MoodDetection from "./MoodDetection";

function App() {
  const [token, setToken] = useState("");
  const [emotion, setEmotion] = useState("");

  useEffect(() => {
    async function getToken() {
      const response = await fetch("/auth/token");
      const json = await response.json();
      setToken(json.access_token);
    }

    getToken();
  }, []);

  let content;
  if (token === "") {
    content = <Login />;
  } else if (emotion === "") {
    content = <MoodDetection emotion={emotion} setEmotion={setEmotion} />;
  } else {
    content = <WebPlayback token={token} emotion={emotion} />;
  }

  return content;
}

export default App;
