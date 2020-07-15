import React, {
  useRef,
  useEffect,
  createContext,
  useContext,
  useState,
  useMemo,
} from 'react';

import api from './api';
import io from 'socket.io-client';

//global context
import { GlobalContext } from './GloablContext';

import getendpoint from '../api-endpoint';
import { useCallback } from 'react';

const endpoint = `${getendpoint()}`;

const socket_endpoint = endpoint;
window.SOCKET_SETUP = 0;
/* mainsocket.on('debug', (message) => {
  console.log('debugger:',message);
}); */

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  //global context
  const { user } = useContext(GlobalContext);

  const [openedconversation, setOpenedconversation] = useState({});
  const [conversations, setconversations] = useState([]);

  /* const sockets = useMemo(
    function () {
      if (
        Array.isArray(conversations) &&
        conversations.length &&
        window.SOCKET_SETUP !== conversations.length
      ) {
        console.log('starting listeners');
        const newconversation_sockets = conversations.map((conversation) => {
          const socket = io(
            `${socket_endpoint}conversation${conversation.conversation_id}`
          );

          socket.on('connect', () => {
            console.log('socket.io connected');
          });

          window.SOCKET_SETUP = conversations.length;
          return { id: conversation.conversation_id, socket };
        });
        return newconversation_sockets.sort();
      }
    },
    [conversations]
  ); */
  // const conversation_sockets_reference = useRef(sockets);
  // const conversation_sockets = conversation_sockets_reference.current;
  /* useEffect(() => {
    connectToConversationSockets();
  }, [conversations]); */
  /* const render_counter = useRef(0);
  console.log(render_counter.current++); */
  async function startconversation(participants) {
    if (participants && participants.length) {
      const ids = [...participants, user].map((parti) => parti.id);
      await api.startconversation(ids);

      // await updateConversations();
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
          // await updateConversations();
        }
      });

      return () => {
        socket.removeAllListeners();
        socket.disconnect();
      };
    }
  }, [user]);

  /* function getSocket(conversation_id) {
    const result = conversation_sockets.filter((conversation_socket) => {
      return conversation_socket.id === conversation_id;
    });
    console.log('sockets', result);
    return result;
  } */

  const updateConversations = useCallback(
    async function updateConversations() {
      const convos = await api.getconversations(user.id);
      setconversations(convos);
    },
    [user.id]
  );
  useEffect(() => {
    updateConversations();
  }, [updateConversations]);

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
        // getSocket,
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

if (window.TEST) {
  console.log(window.TEST++);
} else {
  window.TEST = 0;
  console.log(window.TEST++);
}
