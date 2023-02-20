import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>

        <div className='footer'>
           
           <div className='tab' id='tab2'>
             <div className='linkContainer'>
               <Link className='link' to='/profile'>
                 <h3>Profile</h3>
               </Link>
             </div>
           </div>
           <div className='tab' id='tab2'>
             <div className='linkContainer'>
               <Link className='link' to='/'>
                 <h3>Home</h3>
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

    </div>
  )
}

export default Footer