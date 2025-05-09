import React, { useState } from 'react'

interface InputProps {
  onSendMessage: (message: string) => void
}

const Input = ({ onSendMessage }: InputProps) => {

  // state to store message
  const [inputValue, setInputValue] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  }

  return (
    <section className="input-container">
      <form onSubmit={handleSubmit}>
        <textarea 
          className="input" 
          placeholder="Ask Anything" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="flex justify-end m-2">
          <button 
            className="btn btn-outline btn-info rounded-full"
          >
            ➤
          </button>
        </div>
      </form>
    </section>
  )
}

export default Input
