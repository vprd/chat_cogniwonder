import React, { useState, useEffect, useContext, useRef } from 'react';

import { v1 } from 'uuid';

import { ChatContext } from './ChatContext';
import { GlobalContext } from './GloablContext';

// import { ReactTinyLink } from 'react-tiny-link';
import Toxic from './toxic';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import MenuIcon from '@material-ui/icons/Menu';

import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
// import RefreshIcon from '@material-ui/icons/Refresh';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import { connect } from 'socket.io-client';
// import { Icon } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

import { useSnackbar } from 'notistack';

// const endpoint = `${getendpoint()}`;
// import useTextToxicity from 'react-text-toxicity';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';

const MessagingWindow = ({ drawer }) => {
  const { openedconversation, user } = useContext(ChatContext);
  const [changegroupname, setchangegroupname] = useState(false);

  let conversation_name;
  if (Object.keys(openedconversation).length) {
    if (Array.isArray(openedconversation.conversation_name)) {
      conversation_name = [...openedconversation.conversation_name];
      conversation_name = conversation_name
        .filter((name) => name !== user.first_name)
        .join(', ');
    }

    return (
      <div className="chat-screen">
        <div className="contact-header">
          {!drawer.state ? (
            <IconButton
              style={{ marginRight: 10 }}
              onClick={() => drawer.set(!drawer.state)}
            >
              <ChevronRightIcon />
            </IconButton>
          ) : (
            <></>
          )}
          {openedconversation.conversation.length > 2 ? (
            <AvatarGroup max={4}>
              {openedconversation.conversation_name.map((name, i) => (
                <Avatar key={i}>{name[0]}</Avatar>
              ))}
            </AvatarGroup>
          ) : (
            <Avatar>{conversation_name[0]}</Avatar>
          )}

          <div className="about">
            <h4>{conversation_name}</h4>
            <EditOutlinedIcon
              className="edit-icon"
              onClick={() => setchangegroupname(true)}
            />
            <ChangeName
              setchangegroupname={setchangegroupname}
              changegroupname={changegroupname}
            />
            {/* <ChangeName
                groupname={conversation_name}
                setgroupname={setconversation_name}
                {...{ setchangegroupname }}
              /> */}
            <IconButton style={{ marginLeft: 'auto' }}>
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>

        <Messages />
      </div>
    );
  }
  return (
    <div className="start-chat">
      <img src="https://img.icons8.com/nolan/256/speech-bubble.png" alt="" />
      <div>
        <IconButton onClick={() => drawer.set(!drawer.state)}>
          <MenuIcon />
        </IconButton>
        <h2>Chat</h2>
      </div>
    </div>
  );
};

function ChangeName({ name, changegroupname, setchangegroupname }) {
  return (
    <Dialog
      open={changegroupname}
      onClose={() => setchangegroupname(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Group Name</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>Display name</DialogContentText> */}
        <TextField
          onChange={(e) => {
            e.persist();
          }}
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="username"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setchangegroupname(false)} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const Messages = () => {
  const {
    getmessages,
    openedconversation,
    user,
    sock,
    updateConversations,
    messagesLoad,
    setMessagesLoad,
  } = useContext(ChatContext);

  const [messages, setmessages] = useState([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [model, setModel] = useState(null);
  const [loading_messages, setLoading_messages] = useState(false);
  const [toxicityDetector, setToxicityDetector] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'a') {
        setToxicityDetector((old) => {
          enqueueSnackbar(!old + '', {
            variant: !old ? 'success' : 'error',
            autoHideDuration: 2000,
            preventDuplicate: true,
          });
          return !old;
        });
      }
    });

    setTimeout(() => {
      Toxic().then((m) => {
        // console.log(m);
        setModel(m);
      });

      // .init().then((m) => );
    }, 0);
  }, [enqueueSnackbar]);

  function scrollToBottom() {
    const main_message_container = document.querySelector(
      '.messages-container'
    );
    main_message_container.scrollTop = main_message_container.scrollHeight;
  }
  useEffect(() => {
    const messageInput = document.querySelector('.message-input textarea');
    messageInput.focus();
  });

  useEffect(() => {
    setPage(0);
  }, []);
  useEffect(() => {
    (async () => {
      const messagesobj = await getmessages(openedconversation.conversation_id);
      setTimeout(() => {
        scrollToBottom();
        setTimeout(() => {
          scrollToBottom();
        }, 100);
      });

      setmessages(messagesobj.messages);
      setPage(messagesobj.page);
      setCount(messagesobj.count);

      return () => {
        setmessages([]);
      };
    })();
  }, [openedconversation, getmessages]);
  const [warning, setWarning] = useState(false);
  useEffect(() => {
    const messenger = async (message) => {
      console.log('got message', message);
      if (message.toxicity) {
        setWarning(true);
      }
      if (
        message.conversation_id === openedconversation.conversation_id &&
        message.sender_id !== user.id
      ) {
        /* const newMessages = (
          await getmessages(openedconversation.conversation_id)
        ).messages; */
        message.delivering = false;
        setmessages((oldmessages) => [...oldmessages, message]);

        scrollToBottom();
        updateConversations();
      } else if (message.sender_id === user.id) {
        setmessages((oldmessages) => {
          const newmessages = oldmessages.map((m) => {
            if (m.tempid === message.tempid) {
              message.delivering = false;
              return message;
            }
            return m;
          });
          return newmessages;
        });
      }
    };
    sock.on('message', messenger);

    return () => {
      sock.off('message', messenger);
    };
  }, [messages, openedconversation, sock, updateConversations, user]);

  useEffect(() => {
    /* const message_container = document.querySelector('.messages-view');
    
    // message_container.style.display = '';
    message_container.style.opacity = '1';
    // chat_container.scrollTop = 0; */
    setMessagesLoad(false);
    const chat_container = document.querySelector('.chat-screen');
    chat_container.scrollIntoView(true);

    return () => {
      // message_container.style.display = 'none';
      // message_container.style.opacity = '0';
    };
  }, [messages, setMessagesLoad]);

  /* const [typedText, setTypedText] = useState('');

  const predictions = useTextToxicity(typedText, { delay: 500 }); */

  /* useEffect(() => {
    if (predictions) {
      console.log(predictions[6].match);
      // predictions.reduce;
    }
  }, [predictions]); */

  const onscroll = async (e) => {
    if (!e.target.scrollTop && !loading_messages && messages.length < count) {
      const lastMessage = document
        .querySelector('.messages-view')
        .firstChild.querySelector('.messages')
        .firstChild.getAttribute('data-message-id');

      setLoading_messages(true);

      const messagesobj = await getmessages(
        openedconversation.conversation_id,
        page
      );
      console.log('setting new messages');
      setmessages(messagesobj.messages);
      setPage(messagesobj.page);
      setLoading_messages(false);
      setTimeout(() => {
        try {
          document
            .querySelector(`div[data-message-id="${lastMessage}"]`)
            .scrollIntoView(true);
        } catch (error) {}
      }, 0);
      // setCount(messagesobj.count);
    } else {
    }
  };

  const [sendButton, setSendButton] = useState(false);

  const message = useRef();

  const onchange = (e) => {
    message.current = e.target.value;
    // console.log(message);
    if (message.current.trim()) {
      setSendButton(true);
    } else {
      setSendButton(false);
    }
  };

  const sendmessage = async () => {
    if (true) {
      message.current = message.current.trim();
      const messageInput = document.querySelector('.message-input textarea');
      // messageInput.value = message.current;

      const messageObject = {
        tempid: v1(),
        message: message.current,
        sender: `${user.first_name} ${user.last_name}`,
        sender_id: user.id,
        conversation_id: openedconversation.conversation_id,
        date: new Date(),
        delivering: true,
      };
      setTimeout(() => {
        scrollToBottom();
        updateConversations();
        setSendButton(false);
        messageInput.value = '';
        message.current = '';
      }, 0);

      setmessages([...messages, messageObject]);
      setCount(count + 1);

      scrollToBottom();

      messageInput.focus();

      const toxicity = toxicityDetector
        ? (await model.check(message.current)).filter((p) => p.results[0].match)
        : undefined;
      messageObject.toxicity =
        toxicityDetector && toxicity.length ? toxicity : undefined;
      sock.emit('message', messageObject);
    }
  };

  return (
    <>
      <Dialog
        open={warning}
        onClose={() => setWarning(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Warning</DialogTitle>
        <DialogContent>
          <ReportProblemOutlinedIcon />
          <DialogContentText id="alert-dialog-description">
            Toxicity will not be tolerated, all toxic messages will dissapear
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setWarning(false)} color="primary" autoFocus>
            i understand
          </Button>
        </DialogActions>
      </Dialog>
      <div onScroll={onscroll} className="messages-container">
        <div
          style={{
            // display: messagesLoad ? 'none' : '',
            opacity: messagesLoad ? '0' : '1',
          }}
          className="messages-view"
        >
          {loading_messages ? (
            <div className="loader">
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            <></>
          )}
          {messages ? (
            groupBySenderId(messages).map((message_group, i) => {
              return <MessageBlock key={i} messages={message_group} />;
            })
          ) : (
            <></>
          )}
        </div>

        <div
          style={{
            // display: !messagesLoad ? 'none' : '',
            opacity: messagesLoad ? '1' : '0',
          }}
          className="loader message-loader"
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="message-input">
        <textarea
          onChange={onchange}
          onKeyDown={(e) => {
            if (!e.shiftKey && e.keyCode === 13 && sendButton) {
              e.target.value = '';
              sendmessage();
            }
          }}
          type="text"
          placeholder="type something..."
        />
        <IconButton
          disabled={!!(!sendButton && model)}
          onClick={sendmessage}
          className="send-btn"
        >
          <SendIcon />
        </IconButton>
      </div>
    </>
  );
};

function groupBySenderId(messages) {
  let r = [];

  messages.forEach((message) => {
    r.length > 0 &&
    r[r.length - 1][r[r.length - 1].length - 1].sender_id === message.sender_id
      ? r[r.length - 1].push(message)
      : r.push([message]);
  });

  return r;
}

/* const Message = ({
  type = 'message',
  text,
  sender_name,
  sender_id,
  date,
  group,
  delivering,
  message_id,
}) => {
  const { user } = useContext(ChatContext);

  if (type === 'message') {
    let message_classname = group ? 'message group-message' : 'message';

    return (
      <div
        style={{
          background: delivering ? 'rgb(255, 133, 133)' : '',
          opacity: delivering ? '.5' : '',
        }}
        data-message-id={message_id}
        className={message_classname}
        id={user.id === sender_id ? 'sent-message' : 'message'}
      >
        <h1 id={group ? 'group-sender' : ''}>{sender_name}</h1>
        <span>{text}</span>
        <span id="date-time">{formatAMPM(new Date(date))}</span>
      </div>
    );
  } else if (type === 'badge') {
    return (
      <div className="badge">
        <span>{text}</span>
      </div>
    );
  }
}; */

function MessageBlock({ messages }) {
  const { user } = useContext(GlobalContext);
  const id = user.id === messages[0].sender_id ? 'sender' : '';

  return (
    <div className="message-block" id={id}>
      <Avatar>{messages[0].sender[0]}</Avatar>
      <div className="messages">
        {messages.map((message, i) => (
          <Message2 key={i} message={message} />
        ))}
        <span>{messages[0].sender}</span>
      </div>
    </div>
  );
}

function Message2({ message }) {
  if (
    new RegExp(
      '([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?'
    ).test(message)
  ) {
    console.log(message);
  }
  // message.message = message.message.replace(/(?:\r\n|\r|\n)/g, '<br>');
  return (
    <div
      className="message"
      data-message-id={message.message_id}
      id={message.delivering ? 'delivering-message' : ''}
    >
      <span>{message.message}</span>
      {/* <AccessTimeIcon
        id="message-loader"
        style={{ transform: message.delivering ? 'scale(1)' : 'scale(0)' }}
      /> */}
      {message.delivering ? <AccessTimeIcon id="message-loader" /> : <></>}
      {message.toxicity ? <ReportProblemOutlinedIcon /> : <></>}
    </div>
  );
}

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ampm;
  return strTime;
}
export default MessagingWindow;
