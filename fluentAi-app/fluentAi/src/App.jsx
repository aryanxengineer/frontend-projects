import { useState } from "react";
import axios from "axios";

const App = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState({ google: [], wiki: "" });

  const searchAI = async () => {
    const res = await axios.get(`http://localhost:5000/search?q=${query}`);
    setResponse(res.data);
    speak(res.data.wiki || res.data.google[0]); // Speech Output
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>🔊 AI Assistant</h1>
      <input
        type="text"
        placeholder="Ask me anything..."
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "10px", width: "60%" }}
      />
      <button onClick={searchAI} style={{ padding: "10px", marginLeft: "10px" }}>
        Search
      </button>
      <h2>Google Results</h2>
      <ul>{response.google.map((res, index) => <li key={index}>{res}</li>)}</ul>
      <h2>Wikipedia Summary</h2>
      <p>{response.wiki}</p>
    </div>
  );
};

export default App;
