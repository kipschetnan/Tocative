import React from 'react'
import { useState, useEffect } from "react";
import './style.css'
import './messages.js'
import SendMessage from '../../components/sendMessage/SendMessage';
import ReceiveMessage from '../../components/receiveMessage/ReceiveMessage';
import { Link } from 'react-router-dom'


const Messages = ( { currentRoom, socket, username} ) => {

  const [messageList, setMessageList] = useState([])

  const [currentMessage, setCurrentMessage] = useState('');


  const sendMessage = async (e) => {
    
    e.preventDefault()

    if (currentMessage !== "") {
      const messageData = {
        Room: currentRoom,
        Message: currentMessage,
        Time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
      }

      await socket.emit('send_message', messageData)
      setMessageList((list) => [...list, messageData])


    }
  }

  useEffect( () => {
    socket.on('receive_message', (data) => {
      console.log(data)
      setMessageList((list) => [...list, data])
    })

    return () => socket.removeListener('receive_message')
    
  }, [socket])
  


  return (
    <div className='loginWrapper'>
    <div className='messagesContainer'>
      <main className='liveChat'>
        <div className='header'>
          <Link className='exitLink' to='/chats'>
            <h3>Exit</h3>
          </Link>
        </div>

        <div className='chatBody'>
          
          
          <div className='messagesBody'>

            {messageList.map( (messageContent) => {
              return  <ReceiveMessage message={messageContent.Message}/>
            })}
          
          
          </div>
          
          <form className='messageForm'>
            <input className='textBox' placeholder='Send a message...' onChange={(event) => {setCurrentMessage(event.target.value)}}></input>
            <button onClick={sendMessage}>Send</button>
          </form>
        </div>

        
      </main>
    </div>
    </div>
  )
}

export default Messages