import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import Chatlist from '../chatlist/chatlist';
import Messages from '../messages/Messages';
 import Chatheading from '../chatheading/chatheading';
 import Input from '../input/Input';

import './Chat.css';

let socket;

const Chat = ({ location }) => {
  
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  
  const ENDPOINT = 'localhost:3001';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);
    setRoom(room);
    //setMessage('hello')
    setName(name) ;
     
    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {    // waiting for the msg from backend 
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {  // waiting for the users of a particular room 
      setUsers(users);
    });
   
     
}, []); 
  
  const sendMessage = (event) => {
   
    event.preventDefault();
    if(message) {
      // setMessages(messages => [ ...messages, message ]); //just for checking { this wasted 2 hours }
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div className="outerContainer">
       <Chatlist users={users} chatlist={true}/>
       <div className="container">
          <Chatheading room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default Chat;