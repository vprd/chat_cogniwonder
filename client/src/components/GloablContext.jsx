import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [authentication, setAuthentication] = useState(true);

  return (
    <GlobalContext.Provider
      value={{
        authentication,
        setAuthentication,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
