import React from "react";

// Assets
import logo from "./assets/img/logo.png";

// style
import "./scss/chat-page.css";
const ChatPage = () => {
  return (
    <div className="chat-page">
      <div className="menu">
        <header>
          <img src={logo} alt="logo" />
          <h2>Chat</h2>
        </header>

        <ConversationList />
        <Options />
      </div>

      <div className="chat-screen"></div>
    </div>
  );
};

const ConversationList = () => {
  return (
    <div className="conversation-list">
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
    </div>
  );
};

const Conversation = () => {
  return (
    <div className="conversation">
      <img src="" alt="" />
      <div className="about">
          <h4>Name</h4>
      </div>
    </div>
  );
};

const Options = () => {
  return <div className="menu-options"></div>;
};

export default ChatPage;
