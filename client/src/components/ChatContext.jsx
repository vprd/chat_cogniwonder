import React, {
  useRef,
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

  const conversation_sockets = useRef([]);

  const socketConnection = useRef(false);

  useEffect(() => {
    connectToConversationSockets(
      conversations,
      socketConnection,
      conversation_sockets
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
    if (user.id) {
      const socket = io(`${socket_endpoint}notification${user.id}`);

      socket.on('connect', () =>
        console.log('connected to notification channel')
      );

      socket.on('notification', async (notification) => {
        if (notification.event === 'newconversation') {
          await updateConversations();
        }
      });

      return () => {
        socket.removeAllListeners();
        socket.disconnect();
      };
    }
  }, [user]);

  function getSocket(conversation_id) {
    const result= conversation_sockets.filter((conversation_socket) => {
      return conversation_socket.id === conversation_id;
    });
    console.log(result);
    return result
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

function connectToConversationSockets(
  conversations,
  { current },
  conversation_sockets
) {
  
    if (Array.isArray(conversations) && conversations.length) {
      console.log('starting listeners');
      const newconversation_sockets = conversations.map((conversation) => {
        const socket = io(
          `${socket_endpoint}conversation${conversation.conversation_id}`
        );

        socket.on('connect', () => {
          console.log('socket.io connected');
        });

        socket.on('message', (message) => {});

        return { id: conversation.conversation_id, socket };
      });
      current = true;
      conversation_sockets.current = newconversation_sockets.sort();
    }
  
  
}
