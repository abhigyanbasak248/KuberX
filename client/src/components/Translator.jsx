import React from "react";
import useSpeechRecognition from "../hooks/useSpeechRecognition";

const Translator = () => {
  const {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport,
  } = useSpeechRecognition();

  return (
    <div>
      {hasRecognitionSupport ? (
        <>
          <div>
            {isListening ? (
              <button className="border-black bg-white text-black" onClick={stopListening}>Stop Listening</button>
            ) : (
              <button className="border-black bg-white text-black" onClick={startListening}>Start Listening</button>
            )}
          </div>
          {isListening && <p>Browser is listening...</p>}
        </>
      ) : (
        <h1>Your browser does not support speech recognition.</h1>
      )}
      <p>Text: {text}</p>
    </div>
  );
};

export default Translator;
