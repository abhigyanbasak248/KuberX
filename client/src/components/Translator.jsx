import React from 'react';
import useSpeechRecognition from '../hooks/useSpeechRecognition';
import { FaMicrophone } from 'react-icons/fa';

const Translator = () => {
  const {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport,
  } = useSpeechRecognition();

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  if (!hasRecognitionSupport) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-xl font-bold text-white">Your browser does not support speech recognition.</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-darkBlue">
      <div className="flex flex-col items-center">
        <button
          onClick={handleMicClick}
          className={`text-8xl ${isListening ? 'text-red-500 animate-ping' : 'text-gray-200'} mb-4`}
        >
          <FaMicrophone />
        </button>
        <p className="text-gray-200 text-lg mb-4">
          {isListening ? 'Listening...' : 'Start speaking...'}
        </p>
      </div>
      {text && (
        <div className="mt-4 p-4 border w-3/4 text-center rounded shadow-lg bg-white text-black">
          <p>{text}</p>
        </div>
      )}
    </div>
  );
};

export default Translator;
