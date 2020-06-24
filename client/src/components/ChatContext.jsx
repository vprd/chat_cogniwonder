import React, { createContext, useContext, useState } from "react";

import api from "./api";

//global context
import { GlobalContext } from "./GloablContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  //global context
  const { user } = useContext(GlobalContext);

  const [openedconversation, setOpenedconversation] = useState({});
  const [conversations, setconversations] = useState([]);

  async function updateConversations() {
    console.log("user id:", user.userid);
    const convos = await api.getconversations(user.userid);
    setconversations(convos);
  }

  return (
    <ChatContext.Provider
      value={{
        openedconversation,
        setOpenedconversation,
        updateConversations,
        conversations,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
