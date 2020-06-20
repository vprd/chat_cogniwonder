import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [authentication, setauthentication] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        authentication,
        setauthentication,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
