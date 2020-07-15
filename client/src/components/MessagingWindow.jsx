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
      
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      const list = document.querySelector('.chat-screen');
      list.scrollTop = list.scrollHeight;

    }
  }, [openedconversation]);

  if (Object.keys(openedconversation).length) {
    function ChangeName({ groupname, setgroupname, setchangegroupname }) {
      let newname = '';

      const onchange = (e) => {
        e.preventDefault();
        newname = e.target.value;
        console.log(newname);
      };
      useEffect(() => {
        const inputfield = document.querySelector('#group-name-changer');
        inputfield.focus();
        inputfield.addEventListener('focusout', () => {
          setchangegroupname(false);
        });

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
            onChange={onchange}
            id="group-name-changer"
            type="text"
            value={groupname}
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
  useEffect(() => {
    const messageInput = document.querySelector('.message-input textarea');
    messageInput.focus();
  });
  useEffect(() => {
    (async () => {
      setmessages(await getmessages(openedconversation.conversation_id));
      const list = document.querySelector('.chat-screen');
      list.scrollTop = list.scrollHeight;

      return () => {
        setmessages([]);
      };
    })();
  }, [openedconversation, getmessages]);

  useEffect(() => {
    socket.on('message', async (message) => {
      if (message.conversation_id === openedconversation.conversation_id) {
        setmessages(await getmessages(openedconversation.conversation_id));
        const list = document.querySelector('.chat-screen');
        list.scrollTop = list.scrollHeight;
      }
    });

    return () => {
      socket.removeAllListeners('message');

      /* socket.on('message', (message) => {
      
      }); */
    };
  }, [getmessages, openedconversation, socket]);

  useEffect(() => {
    document.querySelector('.messages-view').style.display = '';

    return () => {
      document.querySelector('.messages-view').style.display = 'none';
    };
  }, [messages]);

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
    // messageObject.delivering = undefined;
    socket.emit('message', messageObject);
    const messageInput = document.querySelector('.message-input textarea');
    messageInput.focus();
    setTimeout(() => {
      const list = document.querySelector('.chat-screen');
      list.scrollTop = list.scrollHeight;
      messageInput.value = '';
    }, 100);
  };
  console.log(messages.filter((message) => message.delevering));
  return (
    <div className="messages-container">
      <div className="messages-view">
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
