import React, { useContext } from "react";

// components
import Login from "./Login";

import ChatPage from "./ChatPage";
//Global context
import { GlobalContext } from "./GloablContext";


const App = () => {
  
  const { authentication } = useContext(GlobalContext);
  return authentication ? <ChatPage /> : <Login />;
};

export default App;
