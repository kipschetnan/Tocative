import React from 'react'
import { useState, useEffect } from "react";
import './style.css'
import './messages.js'
import SendMessage from '../../components/sendMessage/SendMessage';
import ReceiveMessage from '../../components/receiveMessage/ReceiveMessage';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { useQuery, useMutation} from '@apollo/client'
import { QUERY_CONVERSATION, QUERY_ME } from '../../utils/queries';
import { ADD_MESSAGE } from '../../utils/mutations';

const Messages = () => {


  const { convoId } = useParams();
  const { loading, data  } = useQuery(QUERY_CONVERSATION, {
    variables: { id: convoId }
  })
  const [messageText, setMessageText] = useState({ messageText: ''})
  const [addMessage, { error }] = useMutation(ADD_MESSAGE)
  const { loading: userLoading, error: userError, data: userData } = useQuery(QUERY_ME);

  if (userLoading) return <p>Loading logged in user...</p>;
  if (userError) return <p>Error loading logged in user: {userError.message}</p>;

  const handleChange = (event) => {

    setMessageText({
      messageText: event.target.value
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault()
    console.log(messageText)
    console.log(convoId)
    try {
      const { data } = await addMessage({
        variables: { messageText: messageText.messageText, conversation: convoId }
      })
    } catch (e) {
      console.error(e)
    }
    window.location.reload()
  }
  //const conversation = convoData.conversation


  //console.log(conversation)
  //const sendMessage = async (e) => {

  //   e.preventDefault()

  //   if (currentMessage !== "") {
  //     const messageData = {
  //       Room: currentRoom,
  //       Message: currentMessage,
  //       Time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
  //     }

  //     await socket.emit('send_message', messageData)
  //     setMessageList((list) => [...list, messageData])


  //   }
  // }

  // useEffect( () => {
  //   socket.on('receive_message', (data) => {
  //     console.log(data)
  //     setMessageList((list) => [...list, data])
  //   })

  //   return () => socket.removeListener('receive_message')

  // }, [socket])


  if (loading) return <p>Loading</p>
  return (
    <div className='loginWrapper'>
      <div className='messagesContainer'>
        <main className='liveChat'>
          <div className='header'>
            <Link className='exitLink' to='/'>
              <h3>Exit</h3>
            </Link>
          </div>

          <div className='chatBody'>


            <div className='messagesBody'>
              
              {data.conversation.messages.map((messageContent) => {
                if(userData.me.username === messageContent.sender) {
                  return <SendMessage name={messageContent.sender} message={messageContent.messageText}/>
                }else {
                  return <ReceiveMessage name={messageContent.sender} message={messageContent.messageText}/>
                }
              })}

            </div>

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