import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import useSpeechRecognition from "../hooks/useSpeechRecognition";
import { FaMicrophone, FaRocketchat, FaTimes } from 'react-icons/fa';
import toast from "react-hot-toast";

const Chatbot = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", isUser: false },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [inputLanguage, setInputLanguage] = useState("en");
  const [outputLanguage, setOutputLanguage] = useState("en");
  const messagesEndRef = useRef(null);
  const {
    text: recognizedText,
    isListening,
    startListening,
    stopListening,
  } = useSpeechRecognition();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (recognizedText) {
      setNewMessage(recognizedText);
    }
  }, [recognizedText]);

  const handleSendMessage = () => {
    toast.loading("Fetching response...");
    if (newMessage.trim() !== "") {
      const userMessage = { text: newMessage, isUser: true };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setNewMessage("");

      axios
        .post(
          `http://127.0.0.1:5000/chatbot/${encodeURIComponent(
            newMessage
          )}/${inputLanguage}/${outputLanguage}`
        )
        .then((response) => {
          const botMessage = { text: response.data.Answer, isUser: false };
          toast.dismiss();
          setMessages((prevMessages) => [...prevMessages, botMessage]);
          scrollToBottom();
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleInputLanguageChange = (language) => {
    setInputLanguage(language);
  };

  const handleOutputLanguageChange = (language) => {
    setOutputLanguage(language);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="fixed right-4 bottom-4 z-50">
        <button onClick={toggleModal} className="text-3xl p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none">
          <FaRocketchat />
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <div className="flex h-screen justify-center items-start pt-16">
      <section className="relative bg-gradient-to-r from-slate-900 to-slate-700 rounded-md shadow-lg w-full h-full" style={{ maxHeight: '90vh' }}>
        <button onClick={toggleModal} className="absolute top-0 right-0 text-xl p-4 bg-transparent text-white hover:text-gray-300">
                <FaTimes />
              </button>
              <div className="flex-grow p-4 overflow-y-auto" style={{ maxHeight: "500px" }}>
                {messages.map((message, index) => (
                  <div key={index} className={`p-2 mb-4 flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                    <div className="flex items-center justify-center mr-2">
                      {/* SVG icon container */}
                    </div>
                    <div className={`${message.isUser ? "bg-indigo-700 text-white" : "bg-gray-200 text-gray-700 bg-gradient-to-r from-white to-green-500 text-transparent bg-clip-text tracking-wider text-lg"} p-2 rounded-2xl max-w-2xl`}>
                      {message.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <div className="p-4">
                <div className="flex items-center relative">
                  <input
                    type="text"
                    className="flex-grow px-4 py-2 shadow-lg rounded-l-lg focus:outline-none text-white bg-stone-800 bg-opacity-50"
                    placeholder="Ask me anything..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <button
                    onClick={handleMicClick}
                    className={`relative right-9 top-2 transform -translate-y-1/2 ${isListening ? "text-red-500" : "text-gray-300"}`}
                  >
                    <FaMicrophone />
                  </button>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 shadow-lg"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    Send
                  </button>
                </div>
                <div className="mt-4 flex">
                  <label>Input Language:</label>
                  <select
                    onChange={(e) => handleInputLanguageChange(e.target.value)}
                    value={inputLanguage}
                    className="text-gray-200 mr-2 rounded-md ml-1 bg-stone-700"
                  >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                  </select>
                  <label>Output Language:</label>
                  <select
                    onChange={(e) => handleOutputLanguageChange(e.target.value)}
                    value={outputLanguage}
                    className="text-gray-200 rounded-md ml-1 bg-stone-700"
                  >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                  </select>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
