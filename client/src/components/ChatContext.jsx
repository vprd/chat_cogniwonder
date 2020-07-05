import React, {
  useEffect,
  createContext,
  useContext,
  useState,
} from 'react';

import api from './api';
import io from 'socket.io-client';

//global context
import { GlobalContext } from './GloablContext';

import getendpoint from '../api-endpoint';

const endpoint = `${getendpoint()}`;

const socket_endpoint = endpoint;

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

  useEffect(() => {

    setconversation_sockets(
      connectToConversationSockets(conversations)
    );

  }, [conversations]);

  async function startconversation(participants) {
    if (participants && participants.length) {
      const ids = [...participants, user].map((parti) => parti.id);
      await api.startconversation(ids);

      await updateConversations();
    }
  }

  useEffect(() => {
    const socket = io(`${socket_endpoint}notification${user.id}`);

    socket.on('connect', () =>
      console.log('connected to notification channel')
    );

    socket.on('notification', (notification) => {
      if (notification.event === 'newconversation') {
        updateConversations();
      }
    });

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, []);

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
        startconversation,
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

function connectToConversationSockets(conversations) {
  if (Array.isArray(conversations) && conversations.length) {
    console.log('starting listeners');
    const conversation_sockets = conversations.map((conversation) => {
      const socket = io(
        `${socket_endpoint}conversation${conversation.conversation_id}`
      );

      socket.on('connect', () => {
        console.log('socket.io connected');
      });

      socket.on('message', (message) => {});

      return { id: conversation.conversation_id, socket };
    });

    return conversation_sockets.sort();
  }
}
