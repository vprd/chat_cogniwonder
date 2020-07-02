import React, { useState, useEffect, useContext } from 'react';

import MessagingWindow from './MessagingWindow';
//context
import { ChatContext, ChatContextProvider } from './ChatContext';
// Assets
import logo from './assets/img/logo.png';

// style
import './scss/chat-page.css';
import { GlobalContext } from './GloablContext';

import api from './api';

const ChatPage = () => {
  return (
    <ChatContextProvider>
      <div className="chat-page">
        <Menu />
        <MessagingWindow />
      </div>
    </ChatContextProvider>
  );
};
const Menu = () => {
  return (
    <>
      <div className="menu">
        <header>
          <img src={logo} alt="logo" />
          <h2>Chat</h2>
        </header>

        <ConversationList />
        <Options />
      </div>
      <AddConversationDialog />
    </>
  );
};

const ConversationList = () => {
  const { conversations, updateConversations } = useContext(ChatContext);

  useEffect(() => {
    updateConversations();
    // eslint-disable-next-line
  }, []);

  if (conversations) {
    return (
      <div className="conversation-list">
        {conversations.map((conversation, i) => (
          <Conversation key={i} conversation={conversation} />
        ))}
      </div>
    );
  } else {
    return <div className="empty-conversation-list"></div>;
  }
};

const Conversation = ({ conversation }) => {
  const { user } = useContext(GlobalContext);
  const { openedconversation, setOpenedconversation, markRead } = useContext(
    ChatContext
  );

  const indicator =
    conversation.unread &&
    !(conversation.conversation_id === openedconversation.conversation_id)
      ? '7px solid rgb(143, 255, 143)'
      : '';

  if (conversation.conversation.length === 2) {
    return (
      <div
        style={{ borderRight: indicator }}
        onClick={() => {
          markRead(conversation.conversation_id);
          setOpenedconversation({ ...conversation, group: false });
        }}
        className="conversation"
        id={
          conversation.conversation_id === openedconversation.conversation_id
            ? 'opened-conversation'
            : ''
        }
      >
        <img
          src="https://img.icons8.com/color/48/000000/circled-user-male-skin-type-5.png"
          alt="profile"
        />
        <div className="about">
          <h4>
            {conversation.conversation_name.filter(
              (name) => name !== user.name
            )}
          </h4>
        </div>
      </div>
    );
  } else {
    let conversation_name = 'group';
    if (typeof conversation.conversation_name === 'string') {
      conversation_name = conversation.conversation_name;
    }
    conversation_name = conversation.conversation_name.join(', ');

    return (
      <div
        onClick={() => {
          markRead(conversation.conversation_id);
          setOpenedconversation({ ...conversation, group: true });
        }}
        className="conversation group-conversation"
        id={
          conversation.conversation_id === openedconversation.conversation_id
            ? 'opened-conversation'
            : ''
        }
      >
        <img
          src="https://img.icons8.com/color/48/000000/conference-skin-type-7.png"
          alt="group"
        />
        <div className="about">
          <h4>{conversation_name}</h4>
        </div>
      </div>
    );
  }
};

const Options = () => {
  return (
    <>
      <div className="menu-options">
        <div className="option">
          <img
            src="https://img.icons8.com/cotton/64/000000/add-to-chat.png"
            alt=""
          />
          <span>start chat</span>
        </div>
      </div>
    </>
  );
};

const AddConversationDialog = () => {
  const [sugesstions, setsugesstions] = useState();
  const [participants, setparticipants] = useState();

  useEffect(() => {
    document.querySelector('#conversation-adder').focus();
  });

  const onchange = async (e) => {
    console.log('testttt');

    if (e.target.value !== '') {
      setsugesstions(await api.search(e.target.value));
    } else {
      setsugesstions([]);
    }
  };

  const addparticipant = (suggestion) => {
    console.log(participants);
    let exists = false;
    participants &&
      participants.forEach((participant) => {
        if (participant.mobile === suggestion.mobile) exists = true;
      });

    if (!exists) {
      setparticipants([...(participants || []), suggestion]);
    }
  };

  const removeparticipant = (suggestion) => {
    let newlist =
      participants &&
      participants.filter((participant) => {
        if (participant.mobile === suggestion.mobile) return false;
        return true;
      });
    console.log(newlist);
    setparticipants(newlist);
  };

  return (
    <div className="conversation-add">
      <form>
        <div className="users-input">
          <h2>Create</h2>
          {participants && participants.length !== 0 && (
            <div className="participants">
              {participants.map((participant, i) => (
                <div key={i} className="participant">
                  <span>{participant.first_name}</span>
                  <img
                    onClick={() => {
                      removeparticipant(participant);
                    }}
                    src="https://img.icons8.com/pastel-glyph/64/000000/cancel.png"
                    alt="cancel"
                  />
                </div>
              ))}
            </div>
          )}
          <input
            onChange={onchange}
            id="conversation-adder"
            type="text"
            name="email/mobile"
            placeholder="email/mobile"
            required
            autoComplete="off"
          />

          {sugesstions && sugesstions.length !== 0 && (
            <div className="suggestions">
              {sugesstions.map((suggestion, i) => (
                <div
                  key={i}
                  onClick={() => addparticipant(suggestion)}
                  className="suggestion"
                >
                  <h4>{suggestion.first_name}</h4>
                  <p>{suggestion.mobile}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <button type="submit">Start</button>
      </form>
    </div>
  );
};

export default ChatPage;
