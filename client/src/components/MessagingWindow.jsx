import React, { useState, useEffect, useContext } from 'react';

import { ChatContext } from './ChatContext';
const MessagingWindow = () => {
  const { openedconversation, user } = useContext(ChatContext);
  const [changegroupname, setchangegroupname] = useState(false);

  useEffect(() => {
    if (Object.keys(openedconversation).length) {
      const list = document.querySelector('.chat-screen');
      list.scrollTop = list.scrollHeight;
    }
  }, [openedconversation]);

  if (Object.keys(openedconversation).length) {
    function ChangeName({ groupname, setgroupname, setchangegroupname }) {
      let newname = '';

      const onchange = (e) => {
        newname = e.target.value;
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

    const conversation_name = `me and ${openedconversation.conversation_name
      .filter((name) => name !== user.name)
      .join(',')}`;

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
  const {
    getmessages,
    openedconversation,
    getSocket,
    user,
    markUndread,
  } = useContext(ChatContext);

  const socket = getSocket(openedconversation.conversation_id)[0].socket;
  const [messages, setmessages] = useState();

  useEffect(() => {
    (async () => {
      setmessages(await getmessages(openedconversation.conversation_id));
      const list = document.querySelector('.chat-screen');
      list.scrollTop = list.scrollHeight;
    })();
  }, [openedconversation, getmessages]);

  useEffect(() => {
    socket.removeAllListeners('message');
    socket.on('message', async (message) => {
      if (message.conversation_id === openedconversation.conversation_id) {
        setmessages(await getmessages(openedconversation.conversation_id));
        const list = document.querySelector('.chat-screen');
        list.scrollTop = list.scrollHeight;
      }

      markUndread(message.conversation_id);
    });

    return () => {
      socket.removeAllListeners('message');
      socket.on('message', (message) => {
        markUndread(message.conversation_id);
      });
    };
  }, [getmessages, openedconversation, socket, markUndread]);

  let message = '';

  const onchange = (e) => {
    message = e.target.value;
  };

  const sendmessage = () => {
    message = message.trim();
    socket.emit('message', {
      message,
      sender: user.name,
      sender_id: user.userid,
      conversation_id: openedconversation.conversation_id,
      date: new Date(),
    });
    const messageInput = document.querySelector('.message-input textarea');
    setTimeout(() => (messageInput.value = ''));
    messageInput.focus();
  };

  return (
    <div className="messages-container">
      <div className="messages-view">
        {messages &&
          messages.map((message, i) => {
            return (
              <Message
                key={i}
                {...message}
                text={message.message}
                sender_name={message.sender}
                group={openedconversation.group}
              />
            );
          })}
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
}) => {
  const { user } = useContext(ChatContext);

  if (type === 'message') {
    return (
      <div
        className={group ? 'message group-message' : 'message'}
        id={user.userid === sender_id ? 'sent-message' : 'message'}
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
