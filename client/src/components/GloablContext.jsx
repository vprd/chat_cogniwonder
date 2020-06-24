import React, { createContext, useState } from "react";
import api from "./api";
export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [authentication, setAuthentication] = useState(!false);
  const [user, setuser] = useState({ userid: 1, name: "raj" });

  async function Authenticate(username, password) {
    const userdata = await api.authenticate(username, password);
    if (userdata) {
      setAuthentication(true);
      setuser({ userid: userdata, name: username });
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
