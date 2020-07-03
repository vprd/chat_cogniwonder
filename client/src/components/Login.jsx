import React, { useContext, useEffect } from 'react';

// contexts
import { GlobalContext } from './GloablContext';

//styles

import './scss/Login.css';
const Login = () => {
  const { Authenticate } = useContext(GlobalContext);
  let username = '';

  useEffect(() => {
    const username = localStorage.getItem('email_pwd');

    if (username) {
      Authenticate(username);
    }
  });

  onchange = (e) => {
    if (e.target.id === 'username') username = e.target.value;
  };

  onsubmit = async (e) => {
    e.preventDefault();
    Authenticate(username);
  };
  return (
    <div className="login-page">
      <form action="post" onSubmit={onsubmit}>
        <div className="username">
          <input
            onChange={onchange}
            id="username"
            type="text"
            name="email/mobile"
            placeholder="email/mobile"
            required
          />
        </div>
        {/* <div className="password">
          <input
            onChange={onchange}
            type="password"
            name="password"
            id="password"
            placeholder="password"
            required
          />
        </div> */}
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;
