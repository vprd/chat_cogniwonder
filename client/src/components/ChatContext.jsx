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

//global context
import { GlobalContext } from './GloablContext';
import { useSnackbar } from 'notistack';

import getendpoint from '../api-endpoint';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';

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

  const [conversations, setconversations] = useState([]);
  const [openedconversation, setOpenedconversation] = useState({});
  const [sock, setSock] = useState({});
  const [socketState, setSocketState] = useState(false);
  const conversationListLength = useRef(conversations.length);
  // const pconversationListLength = useRef(conversations.length);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    const sock = io(socket_endpoint);
    let errorSnack;
    const onconnect = () => {
      errorSnack && closeSnackbar(errorSnack);
      enqueueSnackbar('connected', {
        variant: 'success',
        autoHideDuration: 2000,
        preventDuplicate: true,
      });
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
            persist: true,
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
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversations.length]);

  const updateConversations = useCallback(
    async function updateConversations() {
      const convos = await api.getconversations(user.id);

      for (let convo of convos) {
        const data = await api.getmessages(convo.conversation_id);
        try {
          convo.recent_activity = data.messages[data.messages.length - 1].date;
        } catch (error) {}
      }

      conversationListLength.current = convos.length;
      setconversations(convos);
    },
    [user]
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
      sock.on('message', message);
      return () => {
        sock.off('online', online);
        sock.off('message', message);
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
        socketState,
        setSocketState,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
