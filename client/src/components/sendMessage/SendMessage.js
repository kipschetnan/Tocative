import React from 'react'
import './SendMessage.css'

const SendMessage = ( {name, message} ) => {
  return (
    <div className='sentBubble'>
        <div className='msgInfo'>
            <h3> { name } </h3>
            <p> { message } </p>
        </div>

    </div>
  )
}

export default SendMessage