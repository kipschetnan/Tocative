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
    <div key={id}>
    
        <div className='chatBox'>
            <div className='chatInfo'>
              
                <Link className='roomLink' to={url} headerName='name'>
                  <h3 className='chatLink'> {name} </h3>
                </Link>
              

                <button className='deleteChat' onClick={onDelete}>Delete</button>
            </div>
        </div>
      
      
    </div>
  )
}

export default Chat