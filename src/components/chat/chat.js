import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

 import Chatlist from '../chatlist/chatlist';
// import Messages from '../Messages/Messages';
 import Chatheading from '../chatheading/chatheading';
 import Input from '../input/Input';

import './Chat.css';

let socket;

const Chat = ({ location }) => {
  
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  
  const ENDPOINT = 'https://project-chat-application.herokuapp.com/';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);
  

  const sendMessage = (event) => {
    event.preventDefault();
    console.log(setUsers)
    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div className="outerContainer">
       <Chatlist users={users} chatlist={true}/>
      <div className="container">
          <Chatheading room={room} />
          {/* <Messages messages={messages} name={name} /> */}
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default Chat;