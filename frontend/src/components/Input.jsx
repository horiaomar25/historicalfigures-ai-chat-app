/* eslint-disable react/prop-types */
import { useState } from "react";

const Input = ({ onSendMessage }) => {
  const[inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  }

  return (
    <section className="input-container">
      <form onSubmit={handleSubmit}>
 <textarea className="input" placeholder="Ask Anything" value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}/>
      <div className="flex justify-end m-2">
        <button className="btn glass bg-blue-400 rounded-full w-12 ">
        ➤
        </button>
      </div>
      </form>
      
    </section>
  );
};

export default Input;
