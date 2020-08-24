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
  const [sock, setSock] = useState({});

  useEffect(() => {
    const sock = io(socket_endpoint);
    sock.emit(
      'subscribe',
      conversations.map((conversation) => ({
        room: 'conversation' + conversation.conversation_id,
      }))
    );

    sock.on('message', (message) => {
      console.log('message from:', message);
    });

    // sock.emit('message', { conversation_id: 9 });
    setSock(sock);
    console.log('connected ti beta chanel', conversations);
  }, [conversations]);

  async function startconversation(participants) {
    if (participants && participants.length) {
      const ids = [...participants, user].map((parti) => parti.id);
      await api.startconversation(ids, user.id);

      // await updateConversations();
    }
  }
  const updateConversations = useCallback(
    async function updateConversations() {
      const convos = await api.getconversations(user.id);
      setconversations(convos);
    },
    [user.id]
  );
  useEffect(() => {
    if (user.id) {
      const socket = io(`${socket_endpoint}notification${user.id}`);

      socket.on('connect', () =>
        console.log('connected to notification channel')
      );

      socket.on('notification', async (notification) => {
        if (notification.event === 'newconversation') {
          console.log('added to new convo');
          await updateConversations();
        }
      });

      return () => {
        socket.removeAllListeners();
        socket.disconnect();
      };
    }
  }, [user, updateConversations]);

  /* function getSocket(conversation_id) {
    const result = conversation_sockets.filter((conversation_socket) => {
      return conversation_socket.id === conversation_id;
    });
    console.log('sockets', result);
    return result;
  } */

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
        sock,
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
