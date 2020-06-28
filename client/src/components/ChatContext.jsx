import React, { useEffect, createContext, useContext, useState } from "react";

import api from "./api";
import io from "socket.io-client";

//global context
import { GlobalContext } from "./GloablContext";

let socket_endpoint =
  window.location.protocol +
  "//" +
  window.location.hostname +
  ":" +
  (window.location.port === "3000" ? "8000" : window.location.port) +
  "/";

socket_endpoint = "http://localhost:8000/";
export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  //global context
  const { user } = useContext(GlobalContext);

  const [openedconversation, setOpenedconversation] = useState({});
  const [conversations, setconversations] = useState([]);
  const [conversation_sockets, setconversation_sockets] = useState();

  function connectToConversationSockets(conversations) {
    if (
      !window.CONVERSATION_SOCKET_CONNECTION &&
      Array.isArray(conversations) &&
      conversations.length
    ) {
      const conversation_sockets = conversations.map((conversation) => {
        console.log('connecting to:',conversation);
        const socket = io(`${socket_endpoint}conversation-${conversation._id}`);

        socket.on("connect", (message) => {
          console.log("connected");
        });

        return { id: conversation._id, socket };
      });

      window.CONVERSATION_SOCKET_CONNECTION = true;
      return conversation_sockets;
    }
  }

  useEffect(() => {
    const conversation_sockets = connectToConversationSockets(conversations);
    if (conversation_sockets) {
      setconversation_sockets(conversation_sockets);
    }
    // eslint-disable-next-line
  }, [conversations]);

  function getSocket(conversation_id) {
    return conversation_sockets.filter((conversation_socket) => {
      return conversation_socket.id === conversation_id;
    });
  }

  async function updateConversations() {
    console.log("updateConversations -> user.id", user.id);

    const convos = await api.getconversations(user.id);
    console.log(convos);
    setconversations(convos);
  }

  function markUndread(conversation_id) {
    /* setconversations(
      conversations.map((conversation) => {
        if (
          conversation_id === conversation._id &&
          conversation_id !== openedconversation._id
        )
          conversation.unread = true;
        return conversation;
      })
    ); */
  }
  function markRead(conversation_id) {
    /* setconversations(
      conversations.map((conversation) => {
        if (conversation_id === conversation._id)
          conversation.unread = false;
        return conversation;
      })
    ); */
  }

  return (
    <ChatContext.Provider
      value={{
        getmessages: api.getmessages,
        markUndread,
        markRead,
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
