import React, {
  useRef,
  useEffect,
  createContext,
  useContext,
  useState,
  useCallback,
} from 'react';

import api from './api';
import io from 'socket.io-client';
import { orderBy } from 'natural-orderby';

//global context
import { GlobalContext } from './GloablContext';
import { useSnackbar } from 'notistack';

import getendpoint from '../api-endpoint';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
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

  const [conversations, setconversations] = useState(false);
  const [openedconversation, setOpenedconversation] = useState({});
  const [sock, setSock] = useState({});
  const [conversations_socket, setConversations_socket] = useState();
  const [socketState, setSocketState] = useState(false);

  const [messagesLoad, setMessagesLoad] = useState(false);
  // const conversationListLength = useRef(conversations.length);

  // const pconversationListLength = useRef(conversations.length);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    const sock = io(socket_endpoint);
    const conversation_socket = io(socket_endpoint + 'conversations');

    const onconversation_socket_update = (data) => {
      const sorted = orderBy(data, [(v) => v.recent_activity], ['desc', 'asc']);
      setconversations(sorted);
    };
    conversation_socket.on('connect', () => {
      console.log('conversation socket connected');
      conversation_socket.on('update', onconversation_socket_update);
      setConversations_socket(conversation_socket);
    });
    var errorSnack;
    const onconnect = () => {
      errorSnack && setTimeout(() => closeSnackbar(errorSnack));
      enqueueSnackbar('connected', {
        variant: 'success',
        autoHideDuration: 2000,
        preventDuplicate: true,
      });
      if (Array.isArray(conversations))
        sock.emit(
          'subscribe',
          conversations.map((conversation) => ({
            room: 'conversation' + conversation.conversation_id,
          }))
        );

      sock.on(
        'disconnect',
        () =>
          (errorSnack = enqueueSnackbar('disconnected', {
            variant: 'error',
            autoHideDuration: 5000,
            preventDuplicate: true,
            action: (key) => (
              <IconButton onClick={() => window.location.reload()}>
                <RefreshIcon />
              </IconButton>
            ),
          }))
      );
    };
    sock.on('connect', onconnect);

    // sock.emit('message', { conversation_id: 9 });
    setSock(sock);

    return () => {
      sock.removeListener('connect', onconnect);
      conversation_socket.off('update', onconversation_socket_update);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversations.length]);

  const updateConversations = useCallback(
    async function updateConversations() {
      if (conversations_socket) {
        conversations_socket.emit('conversations', {
          action: 'get',
          cookies: { mdn: cookies.get('mdn'), cwcc: cookies.get('cwcc') },
        });
      }
    },

    [conversations_socket]
  );

  useEffect(() => {
    if (sock.on) {
      const online = (user) => {};
      sock.on('online', online);

      const message = async (message) => {
        if (openedconversation.conversation_id !== message.conversation_id) {
          await updateConversations();
          markUndread(message.conversation_id);
        }
      };
      const onupadte = async (update) => {
        if (update.type === 'name') {
          // console.log(update, openedconversation);
          await updateConversations();
          setOpenedconversation((o) => ({
            ...o,
            display_name: update.conversation_name,
          }));
        }
      };
      sock.on('convo-update', onupadte);

      sock.on('message', message);
      return () => {
        sock.off('online', online);
        sock.off('message', message);
        sock.off('convo-update', onupadte);
      };
    }
  }, [sock, openedconversation, updateConversations]);

  async function startconversation(participants) {
    if (participants && participants.length) {
      const ids = [...participants, user].map((parti) => parti.id);
      await api.startconversation(ids, user.id);
      await updateConversations();
    }
  }

  useEffect(() => {
    if (user.id) {
      const socket = io(`${socket_endpoint}notification${user.id}`);

      socket.on('connect', () => {
        // console.log('connected to notification channel')
      });

      socket.on('notification', async (notification) => {
        if (notification.event === 'newconversation') {
          // console.log('added to new convo');
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
    // console.log('update convo changed');
  }, [updateConversations]);

  useEffect(() => {
    markRead(openedconversation.conversation_id);
    // console.log('op convo changed', openedconversation);
  }, [openedconversation]);

  function markUndread(conversation_id) {
    const conversationElement = document.querySelector(
      `.conversation${conversation_id}`
    );
    // console.log(conversationElement);
    conversationElement.classList.add('unread-conversation');
  }
  function markRead(conversation_id) {
    try {
      const conversationElement = document.querySelector(
        `.conversation${conversation_id}`
      );
      // console.log(conversationElement);
      conversationElement.classList.remove('unread-conversation');
    } catch (error) {}
  }

  function getmessages(conversation_id, page) {
    return api.getmessages(conversation_id, page);
  }

  return (
    <ChatContext.Provider
      value={{
        getmessages,
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
        socketState,
        setSocketState,
        messagesLoad,
        setMessagesLoad,
        conversations_socket,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
