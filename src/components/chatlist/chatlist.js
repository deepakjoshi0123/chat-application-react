import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';
import Charhead from '../chatheading/chatheading'
import './chatlist.css';

const TextContainer = ({ users , chatlist }) => (
  <div className="textContainer">
    <div>
      <Charhead  room="Your  Contact  List " chatlist={chatlist} />
    </div>
    {
      users
        ? (
          <div>
            <h1>People currently chatting:</h1>
            <div className="activeContainer">
              <h2>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    {name}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;