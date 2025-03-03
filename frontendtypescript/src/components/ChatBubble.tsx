import React from 'react'

// define props for ChatBubble component
interface ChatBubbleProps {
  message: string;
  sender: "user" | "rasa";
}

const ChatBubble = ({message, sender}: ChatBubbleProps) => {
  return (
    <div className="chat chat-start flex justify-end">
          <div className="chat-bubble  text-black bg-blue-300 ">
              {message}
          </div>
      </div>
  )
}

export default ChatBubble