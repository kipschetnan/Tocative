import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FriendList.css'

const FriendList = ({ friendCount, username, friends }) => {
  if (!friends || !friends.length) {
    return <p className="bg-dark text-light p-3">{username}, make some friends!</p>;
  }

  const [view, setView] = useState(false)
  const onView = () => {
    setView(true)
  }

  const onCollapse = () => {
    setView(false)
  }



  return (
    <div>
      <h5>
        {username} has {friendCount} {friendCount === 1 ? 'friends' : 'friends'} {view ? (<button className='collapseButton' onClick={onCollapse}>Collapse friends</button>) : (<button className='button' onClick={onView}>View friends</button>)}
      </h5>

      {view ?(friends.map(friend => (
        <p className='friend'>{friend.username} <p>{friend.firstName} {friend.lastName}</p></p>
        
      ))) : (<p></p>)}
    </div>
  );
};

export default FriendList;