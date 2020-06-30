import React, { createContext, useState } from "react";
import api from "./api";
export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [authentication, setAuthentication] = useState(false);
  const [user, setuser] = useState({ id: "", username: "" });

<<<<<<< HEAD
  async function Authenticate(username, id) {
    setuser({ id, username });

    setTimeout(() => setAuthentication(true));
=======
  async function Authenticate(username, password) {
    const userdata = await api.authenticate(username, password);
    console.log(userdata);
    if (userdata) {
      setuser({ userid: userdata, name: username });
      setTimeout(() => setAuthentication(true));
    } else {
      setAuthentication(false);
    }
>>>>>>> parent of b7f84ab... deploying-server-and-client

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
