import React, { useEffect, createContext, useContext, useState } from "react";

import api from "./api";
import io from "socket.io-client";

//global context
import { GlobalContext } from "./GloablContext";

const socket_endpoint =
  window.location.href === "http://localhost:3000/"
    ? "http://localhost:8000/"
    : window.location.href;
    console.log(socket_endpoint)

function connectToConversationSockets(conversations) {
  
  if (
    !window.CONVERSATION_SOCKET_CONNECTION &&
    Array.isArray(conversations) &&
    conversations.length
  ) {
    
    const conversation_sockets = conversations.map((conversation) => {
      const socket = io(
        `${socket_endpoint}conversation-${conversation.conversation_id}`
      );

      return { id: conversation.conversation_id, socket };
    });

    window.CONVERSATION_SOCKET_CONNECTION = true;
    return conversation_sockets;
  }
}

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  //global context
  const { user } = useContext(GlobalContext);

  const [openedconversation, setOpenedconversation] = useState({});
  const [conversations, setconversations] = useState([]);
  const [conversation_sockets, setconversation_sockets] = useState();

  useEffect(() => {
    const conversation_sockets = connectToConversationSockets(conversations);
    if (conversation_sockets) {
      setconversation_sockets(conversation_sockets);
      console.log("conversation socket set", conversation_sockets);
    }
  }, [conversations]);

  function getSocket(conversation_id) {
    return conversation_sockets.filter((conversation_socket) => {
      return conversation_socket.id === conversation_id;
    });
  }

  async function updateConversations() {
    
    const convos = await api.getconversations(user.userid);
    setconversations(convos);
  }

  return (
    <ChatContext.Provider
      value={{
        getmessages: api.getmessages,
        user,
        getSocket,
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
