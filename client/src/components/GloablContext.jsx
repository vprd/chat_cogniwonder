import React, { createContext, useState } from "react";
import api from "./api";
export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [authentication, setAuthentication] = useState(false);
  const [user, setuser] = useState({ id: "", username: "" });

  async function Authenticate(username, id) {
    setuser({ id, username });

    setTimeout(() => setAuthentication(true));

    return authentication;
  }
  return (
    <GlobalContext.Provider
      value={{
        setuser,
        authentication,
        Authenticate,
        user,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
