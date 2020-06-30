import React from 'react';

import './Message.css';

const Message = ({ message, name ,user }) => {
  let isSentByCurrentUser = true;

  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = false;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{"you"}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{message}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{message}</p>
            </div>
            <p className="sentText pl-10 ">{trimmedName}</p>
          </div>
        )
  );
}

export default Message;