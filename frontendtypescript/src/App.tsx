import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import ChatBubble from "./components/ChatBubble";
import Input from "./components/Input";

// interface for message
interface Message {
  sender: "user" | "rasa";
  message: string;
}

function App() {
  // state to store messages. Type annotation
  const [messages, setMessages] = useState<Message[]>([]);

  const handleMessages = (message: string) => {
    // adding new message to the state and user as sender
    setMessages([...messages, { sender: "user", message }]);
  };

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <section className="chat-container">
          {messages.map((message, index) => (
            <ChatBubble
              key={index}
              message={message.message}
              sender={message.sender}
            />
          ))}
        </section>
        <Input onSendMessage={handleMessages} />
      </main>
    </div>
  );
}

export default App;
