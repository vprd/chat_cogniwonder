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
  const [addconversationview, setaddconversationview] = useState(false);

  return (
    <>
      <div className="menu">
        <header>
          <img src={logo} alt="logo" />
          <h2>Chat</h2>
        </header>

        <ConversationList />
        <Options setaddconversationview={setaddconversationview} />
      </div>
      {addconversationview && (
        <AddConversationDialog
          setaddconversationview={setaddconversationview}
        />
      )}
    </>
  );
};

const Options = ({ setaddconversationview }) => {
  return (
    <>
      <div className="menu-options">
        <div className="option" onClick={() => setaddconversationview(true)}>
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
let conversation_name = conversation.conversation_name;
console.log(conversation_name);

if (Array.isArray(conversation_name)) {
  conversation_name = conversation_name
    .filter((name) => name !== user.first_name)
    .join(', ');
}
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
            {conversation_name}
          </h4>
        </div>
      </div>
    );
  } else {
    
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

const AddConversationDialog = ({ setaddconversationview }) => {
  const [sugesstions, setsugesstions] = useState();
  const [participants, setparticipants] = useState();
  const { user } = useContext(GlobalContext);

  const addparticipant = (suggestion) => {
    let exists = false;
    participants &&
      participants.forEach((participant) => {
        if (participant) {
          console.log(participant, participant);
          if (participant.mobile === suggestion.mobile) exists = true;
        }
      });

    if (!exists) {
      setparticipants([...(participants || []), suggestion]);
    }
  };

  useEffect(() => {
    const input = document.querySelector('#conversation-adder');
    const conversationadd = document; //|| document.querySelector('.conversation-add');
    input.focus();
    const enteradd = (e) => {
      if (e.key === 'Enter' && sugesstions) {
        addparticipant(sugesstions[0]);
        e.preventDefault();
      }
    };
    const dismiss = (e) => {
      if (e.keyCode === 27) setaddconversationview(false);
    };

    input.addEventListener('keydown', enteradd);
    conversationadd.addEventListener('keydown', dismiss);

    return () => {
      conversationadd.removeEventListener('keydown', dismiss);
      input.removeEventListener('keydown', enteradd);
    };
  });

  const onchange = async (e) => {
    e.preventDefault();

    if (e.target.value !== '') {
      const s = await api.search(e.target.value);

      setsugesstions(s.filter((u) => u.mobile !== user.mobile));
    } else {
      setsugesstions([]);
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

  const start = async () => {
    if (participants && participants.length) {
      const ids = [...participants, user].map((parti) => parti.id);
      console.log(await api.startconversation(ids));
    }
  };

  return (
    <div className="conversation-add">
      <form onSubmit={(e) => e.preventDefault()}>
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
            onSubmit={(e) => e.preventDefault()}
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
        <button
          className={
            participants && participants.length ? '' : 'disabled-button'
          }
          onClick={start}
        >
          Start
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
