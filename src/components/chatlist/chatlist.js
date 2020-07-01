import React from 'react';
import Charhead from '../chatheading/chatheading' ;
import './chatlist.css';

const Chatlist= ( props ) => (
  <div className="textContainer">
    <div>
      <Charhead  room="Your  Contact  List " />
     
    </div>
    {
      props.users
        ? (
          <div>
            <div className="activeContainer">(
              <h2>
            {
              props.users.map((user) => (
            <div key={user} className="activeItem">
            <ul> 
             <li >
             { user.name }  
             </li> 
             </ul>
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

export default Chatlist;