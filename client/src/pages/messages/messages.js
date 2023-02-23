import React from 'react'
import { useState, useEffect } from "react";
import './style.css'
import './messages.js'
import SendMessage from '../../components/sendMessage/SendMessage';
import ReceiveMessage from '../../components/receiveMessage/ReceiveMessage';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { useQuery, useMutation} from '@apollo/client'
import { QUERY_CONVERSATION, QUERY_ME, QUERY_MESSAGES } from '../../utils/queries';
import { ADD_MESSAGE } from '../../utils/mutations';
import { useNavigate } from 'react-router-dom';
import Auth from '../../utils/auth';
import ScrollToBottom from 'react-scroll-to-bottom'

import { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';

const socket = io();

console.log('Socket is:', socket)

socket.on('connect', () => {
  console.log('Connected to socket.io server');
});

const Messages = () => {
  const navigate = useNavigate()
  // const chatBoxRef = React.createRef()
  if (!Auth.login) {
    navigate('/login')
  }

  const [messages, setMessages] = useState([])
  const [messageText, setMessageText] = useState({ messageText: ''})
  const [addMessage, { error }] = useMutation(ADD_MESSAGE)
  const { loading: userLoading, error: userError, data: userData } = useQuery(QUERY_ME);
  
  const { convoId } = useParams();
  const { loading } = useQuery(QUERY_CONVERSATION, {
    variables: { id: convoId },
    onCompleted: (data) => {
      setMessages(data.conversation.messages)
    }
  })
  
  const onSubmit = async (event) => {
    event.preventDefault()
    console.log(messageText)
    console.log(convoId)
    try {
      const { data } = await addMessage({
        variables: { messageText: messageText.messageText, conversation: convoId, sender: userData.me.username }
      })
      console.log('This is data:', data)
      socket.emit('message', data.addMessage)
      setMessages((list) => [...messages, data.addMessage])

    } catch (e) {
      console.error(e)
    }
    setMessageText({messageText: ''})

  }

  
  const handleChange = (event) => {

    setMessageText({
      messageText: event.target.value
    });
  };

 



  if (userLoading) return <p>Loading logged in user...</p>;
  if (userError) {
    return <p>Error loading logged in user: {userError.message}</p>;
  }
  

  //  ---------------------


  let roomName = ''

  const chatRoomName = messages.map( (messageContent) => {
    if(userData.me.username === messageContent.sender) {
      

    }
    
    else {
      roomName = messageContent.sender
      console.log (`Currently chatting with: ${roomName}` )
      return
    }
    
  })


  if (loading) return <p>Loading</p>
  return (
    <div className='loginWrapper'>
      <div className='messagesContainer'>
        <main className='liveChat'>
          <div className='headerRoom'>
            <Link className='exitLink' id='exitLink' to='/'>
            X
            </Link>
            
            <h3 className='chatName'> { roomName }</h3>
          </div>

          <div className='chatBody'>


            {/* <div className='messagesBody'> */}

            <ScrollToBottom className='messagesBody'>

              <div className='bubbles'>
                <div className='bubblesWrapper'>
                  {messages.map((messageContent) => {
                    if(userData.me.username === messageContent.sender) {
                      return <SendMessage name='You: ' message={messageContent.messageText}/>

                    }else {
                      return <ReceiveMessage name={messageContent.sender} message={messageContent.messageText}/>
                    }
                  })}

                </div>  

              </div>
            </ScrollToBottom>

            {/* </div> */}

            <form className='messageForm' onSubmit={onSubmit}>
              <input className='textBox' placeholder='Send a message...' value={messageText.messageText} onChange={handleChange}></input>
              <button type='submit'>Send</button>
            </form>
          </div>


        </main>
      </div>
    </div>
  )
}

export default Messages