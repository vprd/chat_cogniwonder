import React, { useContext } from "react";

// components
import Login from "./Login";

import ChatPage from "./ChatPage";
//Global context
import { GlobalContext } from "./GloablContext";
const App = () => {
<<<<<<< HEAD
  const { Authenticate } = useContext(GlobalContext);
  // return authentication ? <ChatPage /> : <Login />;

  useEffect(() => {
    let endpoint =
      window.location.protocol + "//" + window.location.hostname + ":8000";

    if (window.location.hostname === "chatappinprogress.herokuapp.com") {
      endpoint = "https://chatappinprogress.herokuapp.com";
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
=======
  const { authentication } = useContext(GlobalContext);
  return authentication ? <ChatPage /> : <Login />;
>>>>>>> parent of 6fba08a... deploying-server-and-client
};

export default App;
