import React, { useState } from 'react'
import './Chats.css'
import Search from '../../components/searchBar/Search'
import Chat from '../../components/chatBox/Chat'
import { Link } from 'react-router-dom'
import {ADD_FRIEND} from '../../utils/mutations'
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth'
const Chats = () => {

  const [formState, setFormState] = useState({ username: ''})
  const [addFriend, { error }] = useMutation(ADD_FRIEND)
  
  const handleChange = (event) => {

    setFormState({
      username: event.target.value
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault()
    console.log(formState)

    try {
      const { data } = await addFriend({
        variables: { ...formState }
      })
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <div className='loginWrapper'>
    <div className='chatsContainer'>
        <main className='chats'>
          <div className='mainWrapper'>
            <div className="searchBar" >
              <input type="text" placeholder="Search For a Friend..." className="searchInput" value={formState.username} onChange={handleChange}></input>
                <button className="searchSubmit" onClick={onSubmit} > Submit </button>
            </div>
            <h3 id="label" className='listTitle'>My conversations:</h3>
            <div className='list'>
                <Chat name='Name' />
                <Chat name='Name' />
                <Chat name='Name' />
                <Chat name='Name' />
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
    </div>
  )
}
export default Chats