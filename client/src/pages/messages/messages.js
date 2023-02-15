import React from 'react'
import '../messages/messages.css'

const messagePage = () => {
  return (
    <div className='messageContainer'>
      <main className='chats'>
        {/* This shows the current friend you are texting, will be displayed at top of screen */}
        <div className='currentUser'>

          <div className='avatar'>
            <img src='' alt='Avatar'></img>
          </div>
          <div className='username'>
            <h3> Your Friend's Username </h3>
          </div>

        </div>
        {/* This will be the actual chat, will show messages */}
        <div className='chatMessages'>

                <p  className='recievedMessage'> How are you doing </p>
                <p  className='sentMessage'> Not too good buddy </p>


        </div>

        <div>

        </div>

      </main>
    </div>
  )
}

export default messagePage
