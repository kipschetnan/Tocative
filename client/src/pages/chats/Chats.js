import React, { useState } from 'react'
import './Chats.css'
import Search from '../../components/searchBar/Search'
import Chat from '../../components/chatBox/Chat'
import { Link, useNavigate } from 'react-router-dom'
import {ADD_FRIEND} from '../../utils/mutations'
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../../utils/auth'
import { QUERY_USER_CONVERSATIONS } from '../../utils/queries'
import Footer from '../../components/footer/Footer'


const Chats = () => {

  const navigate = useNavigate()

  const [formState, setFormState] = useState({ username: ''})
  const [addFriend, { error }] = useMutation(ADD_FRIEND)
  const { loading: userConvoLoading, error: userConvoError, data: userConvoData } = useQuery(QUERY_USER_CONVERSATIONS);

  if (userConvoLoading) return <p>Loading logged in user...</p>;

  if (userConvoError) {
    
    return <p>Error loading logged in user: {userConvoError.message}</p>;
  }
  
  if (!Auth.login) {
    navigate('/login')
  }


  // console.log(userConvoData.userConversations)
  const initialConvos = userConvoData.userConversations
  const convos = [...initialConvos].reverse()
  console.log(convos)

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
    setFormState({username: ''})
    window.location.reload()
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

            <div className='convosWrapper'>

              <h3 id="label" className='listTitle'>My conversations:</h3>
              <div className='list'>

                {convos.map((convo) => {

                  return <Chat name={convo.name} id={convo._id}/>
                })}

              </div>
            </div>
            
          </div>
          <Footer />
        </main>
    </div>
    </div>
  )
}
export default Chats