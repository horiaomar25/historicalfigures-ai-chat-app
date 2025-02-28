const Input = () => {
  return (
    <section className="input-container">
      <textarea className="input" placeholder="Ask Anything" />
      <div className="flex justify-end m-2">
        <button className="btn glass bg-blue-400 rounded-full w-12 ">
        ➤
      </button>
      </div>
      
    </section>
  );
};

export default Input;
