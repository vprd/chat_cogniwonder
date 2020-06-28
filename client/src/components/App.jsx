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
    let endpoint =
      window.location.protocol + "//" + window.location.hostname + ":8000";

    if (window.location.hostname === "chatappinprogress.herokuapp.com") {
      endpoint = "https://chatappinprogress.herokuapp.com/";
    }
    console.log(endpoint);
    axios
      .get(endpoint + "/api/authenticate" + window.location.search)
      .then((d) => {
        console.log(d.data);
        // setuser({ id: d.data.id, username: d.data.username });
        Authenticate(d.data.username, d.data.id);
      });
  }, []);

  return <ChatPage />;
};

export default App;
