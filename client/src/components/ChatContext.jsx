import React, { useEffect, createContext, useContext, useState } from 'react';

import api from './api';
import io from 'socket.io-client';

//global context
import { GlobalContext } from './GloablContext';

import getendpoint from '../api-endpoint';

const endpoint = `${getendpoint()}`;

const socket_endpoint = endpoint;

//const mainsocket = io(socket_endpoint);

/* mainsocket.on('debug', (message) => {
  console.log('debugger:',message);
}); */

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  //global context
  const { user } = useContext(GlobalContext);

  const [openedconversation, setOpenedconversation] = useState({});
  const [conversations, setconversations] = useState([]);
  const [conversation_sockets, setconversation_sockets] = useState();

  function connectToConversationSockets(conversations) {
    if (Array.isArray(conversations) && conversations.length) {
      const conversation_sockets = conversations.map((conversation) => {
        
        const socket = io(
          `${socket_endpoint}conversation${conversation.conversation_id}`,
          {
            secure: true,
          }
        );
        socket.on('connect', () => {
          
        });

        socket.on('message', (message) => {
          if (openedconversation.conversation_id !== message.conversation_id)
            markUndread(message.conversation_id);
        });

        return { id: conversation.conversation_id, socket };
      });

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
    const convos = await api.getconversations(user.id);
    setconversations(convos);
  }

  function markUndread(conversation_id) {
    /* setconversations(
      conversations.map((conversation) => {
        if (
          conversation_id === conversation.conversation_id &&
          conversation_id !== openedconversation.conversation_id
        )
          conversation.unread = true;
        return conversation;
      })
    ); */
  }
  function markRead(conversation_id) {
    /* setconversations(
      conversations.map((conversation) => {
        if (conversation_id === conversation.conversation_id)
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
