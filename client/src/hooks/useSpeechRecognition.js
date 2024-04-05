import { useEffect } from "react";
import { useState } from "react";

let recognition = null;
if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false; // Change this to false
  recognition.lang = "en-US";
}
const useSpeechRecognition = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  useEffect(() => {
    if (!recognition) {
      return;
    }
    recognition.onresult = (event) => {
      console.log("event: ", event);
      setText(event.results[0][0].transcript); // Set text to final result
      recognition.stop();
      setIsListening(false);
    };
  }, []);
  const startListening = () => {
    setText("");
    setIsListening(true);
    recognition.start();
  };
  const stopListening = () => {
    recognition.stop();
    setIsListening(false);
  };
  return {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport: !!recognition,
  };
};

export default useSpeechRecognition;
