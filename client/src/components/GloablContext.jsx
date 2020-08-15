import React, { createContext, useState } from 'react';
import api from './api';
export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [authentication, setAuthentication] = useState(false);
  const [user, setuser] = useState({ userid: 0, name: '' });

  async function Authenticate(email_pwd, id) {
    const user = await api.authenticate(email_pwd, id);
    if (user) {
      localStorage.setItem('email_pwd', email_pwd);
      setuser({
        mobile: user.mobile,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        id: user.id,
      });
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
