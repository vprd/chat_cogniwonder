import React, { createContext, useState } from 'react';
import api from './api';
export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [authentication, setAuthentication] = useState(false);
  const [user, setuser] = useState({ userid: 0, name: '' });

  async function Authenticate(username, password) {
    const userdata = await api.authenticate(username, password);
    if (userdata) {
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      setuser({ userid: userdata, name: username });
      setTimeout(() => setAuthentication(true));
    } else {
      setAuthentication(false);
    }

    return authentication;
  }
  return (
    <GlobalContext.Provider
      value={{
        authentication,
        Authenticate,
        user,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
