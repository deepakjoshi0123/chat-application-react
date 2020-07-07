import React from "react";
import Charhead from "../chatheading/chatheading";
import "./chatlist.css";
import profile from "../../icons/profile.png";
import online from "../../icons/onlineIcon.png";
const Chatlist = (props) => (
  <div className="textContainer">
    <div>
      <Charhead
        room=" online users in this Group  "
        chatlist={props.chatlist}
      />
    </div>
    {props.frndreq ? <p>friend req</p> : null}
    {props.users ? (
      <div>
        <div>
          (
          <h2>
            {props.users.map((user, i) => (
              <div key={i}>
                {user.email !== props.email ? (
                  <div key={user} className="activeItem">
                    <ul>
                      <li className="service-list">
                        <button
                          className="block"
                          onClick={() => props.chatusr(props.email, user.email)}
                        >
                          <div>
                            <img
                              src={profile}
                              alt="img"
                              className="alignnone size-full wp-image-156 img"
                            />
                            <img
                              src={online}
                              alt="img"
                              className="alignnone size-full wp-image-156 imgOnline"
                            />{" "}
                          </div>{" "}
                          {user.email}
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : null}
              </div>
            ))}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
);

export default Chatlist;
