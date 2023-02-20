import React from 'react'
import './Chat.css'
import { Link } from 'react-router-dom'
const Chat = ( {name} ) => {
  return (
    <div>
      <Link className='link' to=''>
        <div className='chatBox'>
            <div className='chatInfo'>
                <h3> {name} </h3>
                <p> {`>`} </p>
            </div>
        </div>
      </Link>
        
    </div>
  )
}

export default Chat