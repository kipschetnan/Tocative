import React from 'react'
import './Profile.css'
import Navbar from '../../components/Navbar/Navbar'
import FriendList from '../../components/FriendList'

const ProfilePage = (props) => {    
    
    
    const handleClick = async () => {
      try {
        await addFriend({
          variables: { id: user._id },
        });
      } catch (e) {
        console.error(e);
      }
    };

    return (
        <div>
        <div className="flex-row mb-3">
          <h2 className="bg-dark text-secondary p-3 display-inline-block">
            Viewing profile
          </h2>
  
        </div>
  
        <div className="flex-row justify-space-between mb-3">
          <div className="col-12 mb-3 col-lg-8">
          </div>
  
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
            />
          </div>
        </div>
        <div className="mb-3"></div>
      </div>
    )
}

export default ProfilePage