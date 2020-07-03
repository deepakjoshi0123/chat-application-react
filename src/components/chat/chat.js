import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import Chatlist from "../chatlist/chatlist";
import Messages from "../messages/Messages";
import Chatheading from "../chatheading/chatheading";
import Input from "../input/Input";

import "./Chat.css";

let socket;

const Chat = ({ location }) => {
  const [email, setemail] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const ENDPOINT = "localhost:3001";

  useEffect(() => {
    const { email, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);
    setRoom(room);
    //setMessage('hello')
    setemail(email);
    console.log("error ", email, room);
    socket.emit("join", { email, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    // waiting for the msg from backend
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      // waiting for the users of a particular room
      setUsers(users);
    });
  }, []);

  //--------------------------------------for one to chat ------------------

  const setusrmsg = (user) => {
    console.log("hello i am clicked ", user);
    socket.emit("1to1message", { message: "ready for one to one chat ", user });
    socket.on("1to1message", ({ msg, user }) => {
      console.log("from backend ", msg, user);
    });
  };
  //----------------------------------------------------------------------

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      // setMessages(messages => [ ...messages, message ]); //just for checking { this wasted 2 hours }
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <Chatlist users={users} chatlist={true} chatusr={setusrmsg} />

      <div className="container">
        <Chatheading room={room} />
        <Messages messages={messages} name={email} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
