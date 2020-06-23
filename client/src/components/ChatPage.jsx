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

      <ChatScreen />
    </div>
  );
};

const ChatScreen = () => {
  return (
    <div className="chat-screen">
      <div className="contact-header">
        <img
          src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg"
          alt="profile"
        />
        <div className="about">
          <h4>First Name</h4>
          <img src="https://img.icons8.com/android/24/000000/info.png" alt="" />
        </div>
      </div>

      <Messages />
    </div>
  );
};

const Messages = () => {
  return (
    <div className="messages-container">
      <div className="messages-view">
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
      <div className="message-input">
        <textarea type="text" placeholder="type something..." />
        <div className="send-btn">
          <img
            src="https://img.icons8.com/material-outlined/64/000000/filled-sent.png"
            alt="semdbtn"
          />
        </div>
      </div>
    </div>
  );
};

const Message = () => {
  return (
    <div className="message">
      <span>this is a test message too</span>
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
      <img
        src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg"
        alt="profile"
      />
      <div className="about">
        <h4>First Name</h4>
      </div>
    </div>
  );
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
