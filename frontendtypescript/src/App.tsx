import { useEffect, useState, useRef } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import ChatBubble from "./components/ChatBubble";
import Input from "./components/Input";

import RasaResponse from "./components/RasaResponse";
import Logo from "./components/Logo";

// interface for message
interface Message {
  sender: "user" | "rasa";
  message: string;
  image?: string;
}

function App() {
  // state to store messages. Type annotation
  const [messages, setMessages] = useState<Message[]>([]);
  const chatContainerref = useRef<HTMLDivElement>(null);

  const handleMessages = async (message: string) => {
    // adding new message to the state and user as sender
    setMessages([...messages, { sender: "user", message }]);

    const response = await fetch(
      "http://localhost:5005/webhooks/rest/webhook",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      }
    );

    const data = await response.json();

    if (data && data.length > 0) {
      data.forEach((rasaResponse: { text?: string; image?: string }) => {
        // Add rasa response to the message state
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "rasa",
            message: rasaResponse.text || "",
            image: rasaResponse.image || undefined,
          },
        ]);
      });
    }
  };

  useEffect(() => {
    if(chatContainerref.current){
      chatContainerref.current.scrollTo({
        top: chatContainerref.current.scrollHeight,
        behavior: "smooth",
      });
    
    }

  }, [messages]);

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        {messages.length === 0 && (
        <div className="logo-container">
          <Logo/>
        </div>
        )}
        
        
        <section className="chat-container" ref={chatContainerref}>
          {messages.map((message, index) =>
            message.sender === "user" ? (
              <ChatBubble
                key={index}
                message={message.message}
                sender={message.sender}
              />
            ) : (
              <RasaResponse
                key={index}
                message={message.message}
                image={message.image}
              />
            )
          )}
        </section>
        <Input onSendMessage={handleMessages} />
      </main>
    </div>
  );
}

export default App;
