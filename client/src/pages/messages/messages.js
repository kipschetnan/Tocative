import React from 'react';
import { Link } from 'react-router-dom';

const Messages = ({ messages, username }) => {
  if (!messages.length) {
    return <h3>No Messages Yet</h3>;
  }

  return (
    <div>
      <h3>{username}</h3>
      {messages &&
        messages.map(message => (
            <div className="card-body">
              <Link to={`/messages/${message._id}`}>
                <p>{message.messageText}</p>
              </Link>
            </div>
        ))}
    </div>
  );
};

export default Messages;