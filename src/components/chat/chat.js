import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import Chatlist from "../chatlist/chatlist";
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
  const [addtab, setaddtab] = useState(false);

  const [frndreq, setfrndreq] = useState("");

  const [activetab, setactivetab] = useState("cj");

  // if emit.to() works

  const [acceptreqyou, acceptreqfncyou] = useState("");

  const [chattabs, setchattabs] = useState([]); // for chattabs

  const ENDPOINT = "localhost:3001/";

  useEffect(() => {
    const { email, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setRoom(room);

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
      //console.log("usrfnd ", usrfrnd);
      //window.alert("friend req accepted by  ", usrfrnd);
      if (chattabs.includes(usrfrnd) === false) {
        setchattabs((chattabs) => [...chattabs, usrfrnd]);
      }
    }); // here we will confrimation of getting frnd req accpeted
    //console.log("messaegsa --??? ", messages);
    //??????????????????????????????????????????????????????????????????????????????????????????????????

    socket.on("message", (message) => {
      // console.log("new incoming  ", message);
      let copy = messages; // i know i am mutating same address location but spread is not working
      //console.log("check state --- > ", copy, messages);

      if (copy[message.addto] === undefined) {
        copy[message.addto] = []; //
      }

      // console.log("prev messages", copy);
      copy[message.addto].push(message); // how to convert 0 to message.addto ??
      // console.log("after updating", copy);

      // console.log("is it running ", setMessages(copy));
      setMessages(copy);
      // console.log("lets' check state", messages);
      // setMessages((messages) => [...messages, message]);  older version
      //???????????????????????????????????????????????????????????????????????????????????????????????
    });

    socket.on("1to1message", ({ msg, user, frnd }) => {
      setfrndreq(user);
      console.log("from backend ", msg, user);
    });

    socket.on("roomData", ({ users }) => {
      // waiting for the users of a particular room
      setUsers(users);
    });
  }, [messages]);

  //_______________________________________________________________________________________________
  //_______________________________________________________________________________________________

  const acptreqfuncbyyou = (usrfrnd) => {
    console.log("am i clicked ??");
    setfrndreq("");
    if (chattabs.includes(usrfrnd) === false) {
      setchattabs((chattabs) => [...chattabs, usrfrnd]);
    }

    socket.emit("acceptfrndreq", email, usrfrnd);
    console.log("request emitted", email, usrfrnd);
    //emit for accpet req check if want to the same for specfic user
  };

  //--------------------------------------for one to chat ------------------

  const setusrmsg = (user, usrfrnd) => {
    setaddtab(true);
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
      console.log("message emitted ");
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
        <Chatheading
          room={room}
          chattabs={chattabs}
          activetab={setactivetab}
          messages={messages} // or should i send complete 2d array
          email={email}
          frndreq={frndreq}
          setfriendreq={setfrndreq}
          acptreqfunc={acptreqfuncbyyou}
          acceptreq={acceptreqyou}
        />
        {/* {this will change which tab is active and according to that we will send sg to that user} */}

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
