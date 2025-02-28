/* eslint-disable react/prop-types */


const ChatBubble = ({message}) => {
  return (
    <>
    <div className="chat chat-start flex justify-end">
          <div className="chat-bubble  text-black bg-blue-300 ">
              {message}
          </div>
      </div>
      </>
  )
}

export default ChatBubble