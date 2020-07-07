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
  const [frndreq, setfrndreq] = useState("");

  const [activetab, setactivetab] = useState("");

  // if emit.to() works

  const [acceptreqyou, acceptreqfncyou] = useState("");

  const [chattabs, setchattabs] = useState([]); // for chattabs

  const ENDPOINT = "localhost:3001/";

  useEffect(() => {
    const { email, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setRoom(room);
    //setMessage('hello')
    setchattabs((chattabs) => [...chattabs, room]);
    setemail(email);
    socket.emit("join", { email, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);
  //---------------------------------------------------------------------------

  //---------------------------------------------------------------------------
  useEffect(() => {
    // waiting for the msg from backend

    socket.on("acceptfrndreq", ({ usrfrnd }) => {
      console.log("got reply from ", usrfrnd);
      // if (chattabs.includes(usrfrnd) === false) {
      setchattabs((chattabs) => [...chattabs, usrfrnd]);
      //}
    }); // here we will confrimation of getting frnd req accpeted

    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("1to1message", ({ msg, user, frnd }) => {
      setfrndreq(user);
      console.log("from backend ", msg, user);
    });

    socket.on("roomData", ({ users }) => {
      // waiting for the users of a particular room
      setUsers(users);
    });
  }, []);

  //_______________________________________________________________________________________________
  //_______________________________________________________________________________________________

  const acptreqfuncbyyou = (usrfrnd) => {
    acceptreqfncyou(true);
    setfrndreq("");
    if (chattabs.includes(usrfrnd) === false) {
      setchattabs((chattabs) => [...chattabs, usrfrnd]);
    }
    socket.emit("acceptfrndreq", email);
    console.log("request emitted");
    //emit for accpet req check if want to the same for specfic user
  };

  //--------------------------------------for one to chat ------------------

  const setusrmsg = (user, usrfrnd) => {
    // if (chattabs.includes(usrfrnd) === false) {
    //   setchattabs((chattabs) => [...chattabs, usrfrnd]);
    // }
    socket.emit("1to1message", {
      message: "ready for one to one chat ",
      user,
      usrfrnd,
    });
  };

  //-------------------------------------------------------------------------

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      // setMessages(messages => [ ...messages, message ]); //just for checking { this wasted 2 hours }
      socket.emit("sendMessage", message, activetab, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <Chatlist
        users={users}
        chatlist={true}
        chatusr={setusrmsg}
        email={email}
      />

      <div className="container">
        <Chatheading room={room} chattabs={chattabs} activetab={setactivetab} />
        {/* {this will change which tab is active and according to that we will send sg to that user} */}
        <Messages
          messages={messages}
          email={email}
          frndreq={frndreq}
          setfriendreq={setfrndreq}
          acptreqfunc={acptreqfuncbyyou}
          acceptreq={acceptreqyou}
        />
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
