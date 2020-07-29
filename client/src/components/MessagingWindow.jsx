import React, { useRef, useState, useEffect, useContext } from 'react';

import { ChatContext } from './ChatContext';

import getendpoint from '../api-endpoint';
import io from 'socket.io-client';

const endpoint = `${getendpoint()}`;
const socket_endpoint = endpoint;

const MessagingWindow = () => {
  const { openedconversation, user } = useContext(ChatContext);
  const [changegroupname, setchangegroupname] = useState(false);

  useEffect(() => {
    if (Object.keys(openedconversation).length) {
      const list = document.querySelector('.chat-screen');
      // list.scrollTop = list.scrollHeight;
    }
  }, [openedconversation]);

  if (Object.keys(openedconversation).length) {
    function ChangeName({ groupname, setgroupname, setchangegroupname }) {
      let newname = '';
      const inputRef = useRef();
      const onchange = () => {
        newname = inputRef.current.value;
        console.log(newname);
      };
      useEffect(() => {
        // const inputfield = document.querySelector('#group-name-changer');
        const inputfield = inputRef.current;
        inputfield.value = groupname;
        inputfield.focus();

        const dismiss = (e) => {
          if (e.keyCode === 27) setchangegroupname(false);
        };

        document.addEventListener('keydown', dismiss);

        return () => {
          document.removeEventListener('keydown', dismiss);
        };
      });

      return (
        <form onSubmit={setgroupname} className="group-name-input">
          <input
            ref={inputRef}
            onChange={onchange}
            id="group-name-changer"
            type="text"
          />
        </form>
      );
    }

    let conversation_name = openedconversation.conversation_name;

    if (Array.isArray(conversation_name)) {
      conversation_name = conversation_name
        .filter((name) => name !== user.first_name)
        .join(', ');
    }

    const setconversation_name = (newname) => {};
    return (
      <div className="chat-screen">
        <div className="contact-header">
          <img
            src="https://img.icons8.com/color/48/000000/circled-user-male-skin-type-5.png"
            alt="profile"
          />
          <div className="about" onClick={() => setchangegroupname(true)}>
            {!changegroupname ? (
              <h4>{conversation_name}</h4>
            ) : (
              <ChangeName
                groupname={conversation_name}
                setgroupname={setconversation_name}
                {...{ setchangegroupname }}
              />
            )}
            <img
              src="https://img.icons8.com/android/24/000000/info.png"
              alt=""
            />
          </div>
        </div>

        <Messages />
      </div>
    );
  }
  return (
    <div className="start-chat">
      <img src="https://img.icons8.com/nolan/256/speech-bubble.png" alt="" />
      <h2>Chat</h2>
    </div>
  );
};

const Messages = () => {
  const { getmessages, openedconversation, user } = useContext(ChatContext);

  let socketRef = useRef(
    io(`${socket_endpoint}conversation${openedconversation.conversation_id}`, {
      transport: ['websocket'],
    })
  );
  const socket = socketRef.current;

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
    socket.on('message', async (message) => {
      if (message.conversation_id === openedconversation.conversation_id) {
        setmessages(
          (await getmessages(openedconversation.conversation_id)).messages
        );
        scrollToBottom();
      }
    });

    return () => {
      socket.removeAllListeners('message');
    };
  }, [getmessages, openedconversation, socket]);

  useEffect(() => {
    const message_container = document.querySelector('.messages-view');

    message_container.style.display = '';

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
        console.log('top', page + 1);
        setLoading_messages(true);
        const messagesobj = await getmessages(
          openedconversation.conversation_id,
          page
        );
        console.log(messagesobj.page);
        setmessages(messagesobj.messages);
        setPage(messagesobj.page);
        setLoading_messages(false);
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
    socket.emit('message', messageObject);
    const messageInput = document.querySelector('.message-input textarea');
    messageInput.focus();
    setTimeout(() => {
      scrollToBottom();
      messageInput.value = '';
    }, 100);
  };

  return (
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
                group={openedconversation.group}
                delevering={message.delevering}
              />
            );
          })
        ) : (
          <></>
        )}
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
    </div>
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
