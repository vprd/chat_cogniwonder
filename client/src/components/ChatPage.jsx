import React, { useEffect, useContext } from "react";

import MessagingWindow from "./MessagingWindow";
//context
import { ChatContext, ChatContextProvider } from "./ChatContext";
// Assets
import logo from "./assets/img/logo.png";

// style
import "./scss/chat-page.css";
import { GlobalContext } from "./GloablContext";
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
    <div className="menu">
      <header>
        <img src={logo} alt="logo" />
        <h2>Chat</h2>
      </header>

      <ConversationList />
      <Options />
    </div>
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
  const { openedconversation, setOpenedconversation } = useContext(ChatContext);
  

  if (conversation.conversation.length === 2) {
    return (
      <div
        onClick={() => setOpenedconversation(conversation)}
        className="conversation"
        id={
          conversation.conversation_id === openedconversation.conversation_id
            ? "opened-conversation"
            : ""
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
    let conversation_name = "group";
    if (typeof conversation.conversation_name === "string") {
      conversation_name = conversation.conversation_name.join(",");
    }
    conversation_name = conversation.conversation_name.join(", ");
    return (
      <div
        onClick={() => setOpenedconversation(conversation)}
        className="conversation group-conversation"
        id={
          conversation.conversation_id === openedconversation.conversation_id
            ? "opened-conversation"
            : ""
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
    <div className="menu-options">
      <div className="option">
        <img
          src="https://img.icons8.com/cotton/64/000000/add-to-chat.png"
          alt=""
        />
        <span>start chat</span>
      </div>
    </div>
  );
};

export default ChatPage;
