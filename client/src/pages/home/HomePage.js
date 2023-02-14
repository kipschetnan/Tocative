import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'

const HomePage = () => {
  return (
    <div className='homeContainer'>
        
        <main className='chatContainer'>
            <Navbar />

            <div className='content'>
                
                <div className='friendList'>
                    <div className='test'>
                        <h1></h1>
                        <h1></h1>
                    </div>
                </div>
                
                
                <div className='chat'>
                    <div className='activeChat'></div>
                    <div className='typeBox'></div>
                </div>


            </div>

        </main>
    </div>
  )
}

export default HomePage