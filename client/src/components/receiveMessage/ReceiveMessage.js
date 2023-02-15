import React from 'react'
import './ReceiveMessage.css'

const ReceiveMessage = ( {name, message} ) => {
  return (
    <div className='receiveBubble'>
        <div className='msgInfo'>
            <h3> { name } </h3>
            <p> { message } </p>
        </div>
    </div>
  )
}

export default ReceiveMessage