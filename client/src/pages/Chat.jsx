import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", isUser: false },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [inputLanguage, setInputLanguage] = useState("en");
  const [outputLanguage, setOutputLanguage] = useState("en");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const userMessage = { text: newMessage, isUser: true };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setNewMessage("");

      // axios
      //   .post(
      //     `http://127.0.0.1:5000/chatbot/${encodeURIComponent(newMessage)}/${inputLanguage}/${outputLanguage}/`
      //   )
      //   .then((response) => {
      //     const botMessage = { text: response.data.Answer, isUser: false };
      //     setMessages((prevMessages) => [...prevMessages, botMessage]);
      //     scrollToBottom();
      //   })
      //   .catch((error) => console.error("Error:", error));
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

  return (
    <div className="bg-none w-full h-[100vh]">
      <section className="relative cursor-pointer rounded-md h-[100vh]  ">
        <div className="bg-gradient-to-r from-slate-900 to-slate-700 flex flex-col justify-between h-full">
          <div className="flex-grow p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-2 mb-4 flex ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex items-center justify-center mr-2">
                  <svg
                    className={`h-8 w-8 ${message.isUser ? "hidden" : ""}`}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#96999e"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M20.5 9a3.49 3.49 0 0 0-3.45 3h-1.1a2.49 2.49 0 0 0-4.396-1.052L8.878 9.731l3.143-4.225a2.458 2.458 0 0 0 2.98-.019L17.339 8H16v1h3V6h-1v1.243l-2.336-2.512A2.473 2.473 0 0 0 16 3.5a2.5 2.5 0 0 0-5 0 2.474 2.474 0 0 0 .343 1.243L7.947 9.308 4.955 7.947a2.404 2.404 0 0 0-.161-1.438l3.704-1.385-.44 1.371.942.333L10 4 7.172 3l-.334.943 1.01.357-3.659 1.368a2.498 2.498 0 1 0-.682 4.117l2.085 2.688-2.053 2.76a2.5 2.5 0 1 0 .87 3.864l3.484 1.587-1.055.373.334.943L10 21l-1-2.828-.943.333.435 1.354-3.608-1.645A2.471 2.471 0 0 0 5 17.5a2.5 2.5 0 0 0-.058-.527l3.053-1.405 3.476 4.48a2.498 2.498 0 1 0 4.113.075L18 17.707V19h1v-3h-3v1h1.293l-2.416 2.416a2.466 2.466 0 0 0-2.667-.047l-3.283-4.23 2.554-1.176A2.494 2.494 0 0 0 15.95 13h1.1a3.493 3.493 0 1 0 3.45-4zm-7-7A1.5 1.5 0 1 1 12 3.5 1.502 1.502 0 0 1 13.5 2zm0 18a1.5 1.5 0 1 1-1.5 1.5 1.502 1.502 0 0 1 1.5-1.5zM1 7.5a1.5 1.5 0 1 1 2.457 1.145l-.144.112A1.496 1.496 0 0 1 1 7.5zm3.32 1.703a2.507 2.507 0 0 0 .264-.326l2.752 1.251-1.124 1.512zM2.5 19A1.5 1.5 0 1 1 4 17.5 1.502 1.502 0 0 1 2.5 19zm2.037-2.941a2.518 2.518 0 0 0-.193-.234l1.885-2.532 1.136 1.464zm3.76-1.731L6.849 12.46l1.42-1.908L11.1 11.84a2.29 2.29 0 0 0-.033 1.213zM13.5 14a1.5 1.5 0 1 1 1.5-1.5 1.502 1.502 0 0 1-1.5 1.5zm7 1a2.5 2.5 0 1 1 2.5-2.5 2.502 2.502 0 0 1-2.5 2.5zm1.5-2.5a1.5 1.5 0 1 1-1.5-1.5 1.502 1.502 0 0 1 1.5 1.5z"></path>
                      <path fill="none" d="M0 0h24v24H0z"></path>
                    </g>
                  </svg>
                </div>
                <div
                  className={`${
                    message.isUser
                      ? "bg-indigo-700 text-white"
                      : "bg-gray-200 text-gray-700 bg-gradient-to-r from-white to-green-500 text-transparent bg-clip-text tracking-wider text-lg"
                  } p-2 rounded-2xl max-w-2xl `}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-12">
            <div className="flex items-center">
              <input
                type="text"
                className="flex-grow px-2 py-1 border rounded-l-lg focus:outline-none"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                className={`${
                  newMessage.trim() !== ""
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-400 text-gray-700"
                } px-4 py-2 rounded-r-lg`}
                onClick={handleSendMessage}
                disabled={newMessage.trim() === ""}
              >
                Send
              </button>
            </div>
            <div className="mt-4">
              <label>Input Language:</label>
              <select
                onChange={(e) => handleInputLanguageChange(e.target.value)}
                value={inputLanguage}
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
              </select>
            </div>
            <div className="mt-4">
              <label>Output Language:</label>
              <select
                onChange={(e) => handleOutputLanguageChange(e.target.value)}
                value={outputLanguage}
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
              </select>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Chat;