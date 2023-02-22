import React from 'react'
import './Chat.css'
import { Link } from 'react-router-dom'
import { REMOVE_CONVERSATION } from '../../utils/mutations'
import { useMutation } from '@apollo/client'
const Chat = ( {name, id} ) => {

  const [removeConversation, { convoError }] = useMutation(REMOVE_CONVERSATION)

  const onDelete = async() => {
    try {
      const { data } = await removeConversation({
        variables: {id: id}
      })
      console.log('Conversation deleted.')
    } catch (e) {
      console.error(e)
    }
    window.location.reload()
  }

  const url = `/messages/${id}`
  console.log(url)
  return (
    <div className='chat' key={id}>
      <Link className='link' to={url}>
        <div className='chatBox'>
            <div className='chatInfo'>
                <h3> {name} </h3>
                <p> {`>`} </p>
            </div>
        </div>
      </Link>
      <button onClick={onDelete}>Delete</button>
    </div>
  )
}

export default Chat