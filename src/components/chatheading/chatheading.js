import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';

import './chatheading.css';

const chatheading = ({ room ,chatlist}) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
  {!chatlist?<img className="onlineIcon" src={onlineIcon} alt="online icon" />:null}
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
 {!chatlist?<a href="/"><img src={closeIcon} alt="close icon" /></a>:null}
    </div>
  </div>
);

export default chatheading;