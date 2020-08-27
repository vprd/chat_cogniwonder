import React, { useContext, useEffect } from 'react';

import Cookies from 'universal-cookie';

// contexts
import { GlobalContext } from './GloablContext';

//styles
import './scss/Login.css';

const cookies = new Cookies();

window.addEventListener('keydown', (e) => {
  console.log(e);
  if (e.ctrlKey && e.key === 't') {
    cookies.set('mdn', '8884016724');
    // cookies.set('mdn', '1234567890');
    cookies.set('cwcc', 'cw5f35a349096779.421');
    window.location.reload();
  }
});

const Login = () => {
  const { Authenticate } = useContext(GlobalContext);
  let username = '';

  useEffect(() => {
    try {
      Authenticate(cookies.get('mdn'), cookies.get('cwcc'));
    } catch {}

    // eslint-disable-next-line
  }, []);

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
