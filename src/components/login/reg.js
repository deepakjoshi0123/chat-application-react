import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./login.css";

export default function SignIn() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [reppassword, setreppassword] = useState("");
  const [setAuthToChat, setAuthToChatfunc] = useState(false);

  const sentTOdb = () => {
    console.log("hello there", name, room, password, reppassword);
    const user = {
      fullname: name,
      email: email,
      password: password,
      room: room,
    };

    axios.post("http://localhost:3001", user).then((res) => {
      if (res) {
        setAuthToChatfunc(true);
      }
    });
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Let's Chat Register </h1>
        <div>
          <input
            placeholder="enter Name"
            className="joinInput"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
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
            placeholder="repeat password"
            className="joinInput mt-20"
            type="password"
            onChange={(event) => setreppassword(event.target.value)}
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
          onClick={(e) =>
            !email || !room || !password || setAuthToChat === false
              ? e.preventDefault()
              : null
          }
          to={`/login`}
        >
          <button className={"button mt-20"} type="submit" onClick={sentTOdb}>
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}
