import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./login.css";

export default function SignIn() {
  const [room, setRoom] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const sentTOdb = () => {
    console.log("hello there", room, password);
    const user = {
      email: email,
      password: password,
      room: room,
    };

    axios.post("http://localhost:3001/login", user).then((res) => {
      console.log(res, " login got response from the backend rest api ");
    });
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Let's Chat </h1>
        <div>
          <input
            placeholder="enter email"
            className="joinInput mt-20"
            type="text"
            onChange={(event) => setemail(event.target.value)}
          />
        </div>

        <div>
          <input
            placeholder="enter password"
            className="joinInput mt-20"
            type="password"
            onChange={(event) => setpassword(event.target.value)}
          />
        </div>

        <div>
          <input
            placeholder="enter Room"
            className="joinInput mt-20"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        <Link
          onClick={(e) => (!email || !room ? e.preventDefault() : null)}
          to={`/chat?email=${email}&room=${room}`}
        >
          <button className={"button mt-20"} type="submit" onClick={sentTOdb}>
            join chat
          </button>
        </Link>
        <Link to={`/register`}>
          <button className={"button mt-20"} type="submit">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}
