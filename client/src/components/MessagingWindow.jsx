import React, { useRef, useState, useEffect, useContext } from 'react';

import { ChatContext } from './ChatContext';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import { connect } from 'socket.io-client';
// import { Icon } from '@material-ui/core';
/* import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
 */
// const endpoint = `${getendpoint()}`;

const MessagingWindow = ({ drawer }) => {
  const { openedconversation, user } = useContext(ChatContext);
  const [changegroupname, setchangegroupname] = useState(false);

  /* useEffect(() => {
    if (Object.keys(openedconversation).length) {
      const list = document.querySelector('.chat-screen');
      // list.scrollTop = list.scrollHeight;
    }
  }, [openedconversation]); */

  if (Object.keys(openedconversation).length) {
    let conversation_name = openedconversation.conversation_name;

    if (Array.isArray(conversation_name)) {
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
              <MenuIcon />
            </IconButton>
          ) : (
            <></>
          )}
          <img
            src="https://img.icons8.com/color/48/000000/circled-user-male-skin-type-5.png"
            alt="profile"
          />
          <div className="about">
            {!changegroupname ? (
              <>
                <h4>{conversation_name}</h4>
                <EditOutlinedIcon
                  className="edit-icon"
                  onClick={() => setchangegroupname(true)}
                />
              </>
            ) : (
              <Dialog
                open={changegroupname}
                onClose={() => setchangegroupname(false)}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">
                  Change Conversation name
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>Display name</DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="username"
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => setchangegroupname(false)}
                    color="primary"
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            )}
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

const Messages = () => {
  const {
    getmessages,
    openedconversation,
    user,
    sock,
    updateConversations,
  } = useContext(ChatContext);

  const [messages, setmessages] = useState([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);

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
      setmessages(messagesobj.messages);
      setPage(messagesobj.page);
      setCount(messagesobj.count);
      scrollToBottom();

      return () => {
        setmessages([]);
      };
    })();
  }, [openedconversation, getmessages]);

  useEffect(() => {
    const messenger = async (message) => {
      if (message.conversation_id === openedconversation.conversation_id) {
        setmessages(
          (await getmessages(openedconversation.conversation_id)).messages
        );
        scrollToBottom();
        updateConversations().then(() => {});
      }
    };
    sock.on('message', messenger);

    return () => {
      sock.off('message', messenger);
    };
  }, [getmessages, openedconversation, sock, updateConversations]);

  useEffect(() => {
    const message_container = document.querySelector('.messages-view');
    const chat_container = document.querySelector('.chat-screen');

    message_container.style.display = '';
    // chat_container.scrollTop = 0;
    chat_container.scrollIntoView(true);
    return () => {
      message_container.style.display = 'none';
    };
  }, [messages]);

  const [loading_messages, setLoading_messages] = useState(false);
  useEffect(() => {
    const main_message_container = document.querySelector(
      '.messages-container'
    );

    const onscroll = async (e) => {
      if (!e.target.scrollTop && !loading_messages && messages.length < count) {
        const lastMessage = document
          .querySelector('.messages-view')
          .firstChild.getAttribute('data-message-id');

        setLoading_messages(true);
        const messagesobj = await getmessages(
          openedconversation.conversation_id,
          page
        );

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

    main_message_container.addEventListener('scroll', onscroll);

    return () => {
      main_message_container.removeEventListener('scroll', onscroll);
    };
  }, [
    page,
    count,
    loading_messages,
    openedconversation,
    getmessages,
    messages,
  ]);

  let message = '';

  const onchange = (e) => {
    message = e.target.value;
  };

  const sendmessage = () => {
    message = message.trim();
    const messageObject = {
      message,
      sender: `${user.first_name} ${user.last_name}`,
      sender_id: user.id,
      conversation_id: openedconversation.conversation_id,
      date: new Date(),
      delivering: true,
    };
    setmessages([...messages, messageObject]);
    setCount(count + 1);
    scrollToBottom();
    // messageObject.delivering = undefined;
    // socket.emit('message', messageObject);

    console.log('sending message');
    // messageObject.conversation_id = 5;
    sock.emit('message', messageObject);
    const messageInput = document.querySelector('.message-input textarea');
    messageInput.focus();
    setTimeout(() => {
      scrollToBottom();
      messageInput.value = '';
      updateConversations();
    }, 100);
  };

  return (
    <>
      <div className="messages-container">
        <div className="messages-view">
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
            messages.map((message, i) => {
              return (
                <Message
                  key={i}
                  {...message}
                  text={message.message}
                  sender_name={message.sender}
                  group={openedconversation.conversation.length > 2}
                  delevering={message.delevering}
                />
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="message-input">
        <textarea
          onChange={onchange}
          onKeyDown={(e) => {
            if (!e.shiftKey && e.keyCode === 13 && message.trim() !== '') {
              sendmessage();
            }
          }}
          type="text"
          placeholder="type something..."
        />
        <div onClick={sendmessage} className="send-btn">
          <img
            src="https://img.icons8.com/material-outlined/64/000000/filled-sent.png"
            alt="semdbtn"
          />
        </div>
      </div>
    </>
  );
};

const Message = ({
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
};

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
