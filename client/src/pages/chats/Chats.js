import React from 'react'
import './Chats.css'
import Search from '../../components/searchBar/Search'
import Chat from '../../components/chatBox/Chat'
import { Link } from 'react-router-dom'

const Chats = () => {

  return (
    <div className='chatsContainer'>
        <main className='chats'>
          
          <div className='mainWrapper'>

            <div className='mainContainer'>
              
              <Search />
                
              <div className='chatList'>

                  <h3>My conversations:</h3>
                  <div className='list'>
                    <Chat name='Name' />
                    <Chat name='Name' />
                    
                  </div>
                  
              </div>
              
            </div>

          </div>

          <div className='footer'>

            <div className='tab' id='tab1'>
              <div className='linkContainer'>
                <Link className='link' to='/friends'>
                  <h3>Friends</h3>
                </Link>
              </div>
            </div>

            <div className='tab' id='tab2'>
              <div className='linkContainer'>
                <Link className='link' to='/profile'>
                  <h3>Profile</h3>
                </Link>
              </div>
            </div>

            <div className='tab' id='tab3'>
              <div className='linkContainer'>
                <Link className='link' to='/createRoom'>
                  <h3>Create Room</h3>
                </Link>
              </div>
            </div>
          </div>
        </main>
    </div>
  )
}

export default Chats