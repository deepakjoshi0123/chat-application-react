import React from "react";

import "./Message.css";

const Message = ({ message: { text, user, time }, email }) => {
  let isSentByCurrentUser = false;

  const trimmedName = email.trim().toLowerCase();
  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return !isSentByCurrentUser ? (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{text}</p>
      </div>
      <p className="sentText pl-10 ">{user}</p>
      <p className="sentText pl-10 ">{time}</p>
    </div>
  ) : (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{" you "}</p>
      <p className="sentText pl-10 ">{time}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{text}</p>
      </div>
    </div>
  );
};

export default Message;
