import React from 'react'
import './Chats.css'
import Search from '../../components/searchBar/Search'
import Chat from '../../components/chatBox/Chat'

const Chats = () => {

  return (
    <div className='chatsContainer'>
        <main className='chats'>
            <Search />
            
            
            <div className='chatList'>

                <h3 id="label">My conversations:</h3>
                <div className='list'>
                    <Chat name='Name' />
                    <Chat name='Name' />
                    <Chat name='Name' />
                    <Chat name='Name' />
                </div>
                
            </div>

            
        </main>
    </div>
  )
}

export default Chats