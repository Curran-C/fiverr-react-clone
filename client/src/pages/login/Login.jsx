import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./Login.scss";

function Login() {
  //hooks
  const username = useRef(null);
  const password = useRef(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //functions
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/login",
        {
          username: username.current.value,
          password: password.current.value,
        },
        { withCredentials: true } //lets cookies be used in the app
      );
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  //return
  return (
    <div className="login">
      <form onSubmit={handleFormSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="">Username</label>
        <input
          name="username"
          type="text"
          placeholder="johndoe"
          ref={username}
        />
        <label htmlFor="">Password</label>

        <input name="password" type="password" ref={password} />
        <button type="submit">Login</button>

        {error && error}
      </form>
    </div>
  );
}

export default Login;
