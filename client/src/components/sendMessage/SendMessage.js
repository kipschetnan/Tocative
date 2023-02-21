import React from 'react'
import './SendMessage.css'

const SendMessage = ( {name, message} ) => {
  return (
    <div key={message._id} className='sentBubble'>
        <div className='msgInfo'>
            <h3 className='name'> { name } </h3>
            <p> { message } </p>
        </div>

    </div>
  )
}

export default SendMessage