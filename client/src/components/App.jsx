import React, { useContext, useEffect } from "react";
// components

import axios from "axios";

import ChatPage from "./ChatPage";
//Global context
import { GlobalContext, GlobalContextProvider } from "./GloablContext";
const App = () => {
  const { Authenticate } = useContext(GlobalContext);
  // return authentication ? <ChatPage /> : <Login />;

  useEffect(() => {
      const endpoint = "http://" + window.location.hostname + ":8000";
      console.log(endpoint);
      axios
        .get(endpoint + "/api/authenticate" + window.location.search)
        .then((d) => {
          console.log(d.data);
          // setuser({ id: d.data.id, username: d.data.username });
          Authenticate(d.data.username, d.data.id);
        });
    
  }, []);

  return (
    
      <ChatPage />
    
  );
};

export default App;
