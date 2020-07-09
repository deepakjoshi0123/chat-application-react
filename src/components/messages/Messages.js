import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Friendreq from "../modal/friendreq";
import Message from "./message/Message";
import "./Messages.css";

const Messages = ({ messages, email, frndreq, setfriendreq, acptreqfunc }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, i) => (
      <Message message={message} email={email} />
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
