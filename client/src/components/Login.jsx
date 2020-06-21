import React, { useContext } from "react";

import axios from "axios";
// contexts
import { GlobalContext } from "./GloablContext";

//styles
import "./scss/Login.css";
const Login = () => {
  const { setAuthentication } = useContext(GlobalContext);
  let username = "",
    password = "";

  onchange = (e) => {
    if (e.target.id === "username") username = e.target.value;
    if (e.target.id === "password") password = e.target.value;
  };

  onsubmit = async (e) => {
    e.preventDefault();
    if (await authenticate(username, password)) setAuthentication(true);
  };
  return (
    <div className="login-page">
      <form action="post" onSubmit={onsubmit}>
        <div className="username">
          <input
            onChange={onchange}
            id="username"
            type="text"
            name="username"
            placeholder="username"
            required
          />
        </div>
        <div className="password">
          <input
            onChange={onchange}
            type="password"
            name="password"
            id="password"
            placeholder="password"
            required
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

async function authenticate(username, password) {
  const endpoint = "http://localhost:8000";
  const result = await axios.post(endpoint + "/api/authenticate", {
    username,
    password,
  });
  return result.data;
}

export default Login;
