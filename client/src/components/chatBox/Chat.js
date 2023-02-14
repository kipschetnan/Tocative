import React from 'react'
import './Chat.css'

const Chat = ( {name} ) => {
  return (
    <div>
        <div className='chatBox'>
            <div className='chatInfo'>
                <h3> {name} </h3>
                <p> {`>`} </p>
            </div>
        </div>
    </div>
  )
}

export default Chat