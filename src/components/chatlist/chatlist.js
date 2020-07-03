import React from "react";
import Charhead from "../chatheading/chatheading";
import "./chatlist.css";
import profile from "../../icons/profile.png";
const Chatlist = (props) => (
  <div className="textContainer">
    <div>
      <Charhead
        room=" online users in this Group  "
        chatlist={props.chatlist}
      />
    </div>
    {props.users ? (
      <div>
        <div>
          (
          <h2>
            {props.users.map((user) => (
              <div key={user} className="activeItem">
                <ul>
                  <li className="service-list">
                    <button
                      className="block"
                      onClick={() => props.chatusr(user.name)}
                    >
                      <div>
                        <img
                          src={profile}
                          alt="img"
                          className="alignnone size-full wp-image-156 img"
                        />{" "}
                      </div>{" "}
                      {user.name}
                    </button>
                  </li>
                </ul>
              </div>
            ))}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
);

export default Chatlist;
