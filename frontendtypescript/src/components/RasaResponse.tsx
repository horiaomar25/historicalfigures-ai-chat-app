import React from 'react'

interface RasaBubbleProps {
  message: string;
  image?: string;
}

const RasaResponse = ({message, image}: RasaBubbleProps) => {
  console.log(image)
  return (
    <div className='rasa-bubble flex flex-col items-center'>
      {message && <p>{message}</p>}
      {image && image !== "undefined" && <img src={image} alt="Rasa response" className="rasa-image" />}

    </div>
  )
}

export default RasaResponse