import React from 'react';
import { Link } from 'react-router-dom';
import './FriendList.css'

const FriendList = ({ friendCount, username, friends }) => {
  if (!friends || !friends.length) {
    return <p className="bg-dark text-light p-3">{username}, make some friends!</p>;
  }

  return (
    <div>
      <h5>
        {username} has {friendCount} {friendCount === 1 ? 'friends' : 'friends'}
      </h5>
      {friends.map(friend => (
        <button className="currentFriend" key={friend._id}>
          <Link to={`/profile/${friend.username}`}>{friend.username}</Link>
        </button>
      ))}
    </div>
  );
};

export default FriendList;