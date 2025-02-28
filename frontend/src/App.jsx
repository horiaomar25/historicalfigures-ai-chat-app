import {useState} from 'react';
import './App.css';
import ChatBubble from './components/ChatBubble';
import Input from './components/Input';
import Sidebar from './components/Sidebar';

function App() {

  // state to store the messages from the user
  const [messages, setMessages] = useState([]);

  const handleMessages = (message) => {

    setMessages([...messages, {sender: 'user', message}]);

  }


  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <section className="chat-container">
        {messages.map((message, index) => (
          <ChatBubble key={index} message={message.message}/>
        ))}
        </section>
        <Input onSendMessage={handleMessages}/>
      </main>
    </div>
  );
}

export default App;
