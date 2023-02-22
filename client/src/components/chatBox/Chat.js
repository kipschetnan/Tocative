import React from 'react'
import './Chat.css'
import { Link } from 'react-router-dom'
const Chat = ( {name, id} ) => {

  const url = `/messages/${id}`
  console.log(url)
  return (
    <div key={id}>
      <Link className='link' to={url}>
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