import React from "react";
import "./friendreq.css";

const friendreq = ({ setfriendreq, frndreqName, acptreqyou }) => (
  <body>
    <div className="modal-content">
      <div className="modal-header">
        <h2>Notification</h2>
      </div>
      <div className="modal-body">
        <p>You got the chat request from {frndreqName}</p>
      </div>
      <div className="modal-footer">
        <h3>Do you want to chat ? </h3>
        <button
          className="button button1"
          onClick={() => acptreqyou(frndreqName)}
        >
          want to chat{" "}
        </button>
        <button
          className="button button2"
          onClick={() => {
            setfriendreq("");
          }}
        >
          discard{" "}
        </button>
      </div>
    </div>
  </body>
);

export default friendreq;
