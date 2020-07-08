import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Friendreq from "../modal/friendreq";
import Message from "./message/Message";
import "./Messages.css";

const Messages = ({ messages, email, frndreq, setfriendreq, acptreqfunc }) => (
  <ScrollToBottom className="messages">
    {console.log("msgs in mgs compt", messages)}
    {messages.map((message, i) => (
      <div key={i}>
        <Message message={message} email={email} />
      </div>
    ))}
    {frndreq ? (
      <Friendreq
        frndreqName={frndreq}
        setfriendreq={setfriendreq}
        acptreqyou={acptreqfunc}
      />
    ) : null}
  </ScrollToBottom>
);

export default Messages;
