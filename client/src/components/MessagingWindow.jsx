import React, { useEffect, useContext } from "react";

import { ChatContext } from "./ChatContext";
const MessagingWindow = () => {
  const { openedconversation } = useContext(ChatContext);

  useEffect(() => {
    if (Object.keys(openedconversation).length) {
      const list = document.querySelector(".chat-screen");
      list.scrollTop = list.scrollHeight;
    }
  }, [openedconversation]);

console.log(openedconversation);

  if (Object.keys(openedconversation).length) {
    return (
      <div className="chat-screen">
        <div className="contact-header">
          <img
            src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg"
            alt="profile"
          />
          <div className="about">
            <h4>{openedconversation.conversation_name.join(',')}</h4>
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

const Message = ({ type = "message", text = "this is a test message too" }) => {
  if (type === "message") {
    return (
      <div className="message">
        <span>{text}</span>
      </div>
    );
  } else if (type === "badge") {
    return (
      <div className="badge">
        <span>{text}</span>
      </div>
    );
  }
};

export default MessagingWindow;
