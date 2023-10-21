import { useState, useEffect } from "react";
import "./App.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";

const App = () => {
  const [copyText, setCopyText] = useState("");
  const [listenText, setListenText] = useState("Start Listening");
  const [isCopied, setCopied] = useClipboard(copyText);

  const startListening = () => {
    if (listenText === "Start Listening") {
      SpeechRecognition.startListening({
        continuous: true,
        language: "en-IN",
      });
      setListenText("Stop Listening");
    } else {
      SpeechRecognition.stopListening();
      setListenText("Start Listening");
    }
  };

  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    // Implement voice command actions here
    if (transcript) {
      if (transcript.toLowerCase() === "copy") {
        setCopyText(transcript);
      } else if (transcript.toLowerCase() === "clear") {
        setCopyText("");
      } else if (transcript.toLowerCase() === "save") {
        // Implement saving the transcript
        console.log("Transcript saved: " + transcript);
      }
    }
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser does not support speech recognition.</span>;
  }

  return (
    <div className="container">
      <h2>Speech to Text Converter</h2>
      <p>To copy text first click on the textarea</p>
      <div
        onClick={() => {
          setCopyText(transcript);
        }}
        className="main-content"
      >
        {transcript}
      </div>
      <div className="btn-style">
        <button onClick={setCopied}>
          Was it copied? {isCopied ? "Yes! 👍" : "Nope! 👎"}
        </button>
        <button onClick={startListening}>{listenText}</button>
      </div>
    </div>
  );
};

export default App;
