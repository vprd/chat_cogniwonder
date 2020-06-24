import React, { useState, useEffect, useContext } from "react";

import { ChatContext } from "./ChatContext";
const MessagingWindow = () => {
  const { openedconversation } = useContext(ChatContext);

  useEffect(() => {
    if (Object.keys(openedconversation).length) {
      const list = document.querySelector(".chat-screen");
      list.scrollTop = list.scrollHeight;
    }
  }, [openedconversation]);

  if (Object.keys(openedconversation).length) {
    return (
      <div className="chat-screen">
        <div className="contact-header">
          <img
            src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg"
            alt="profile"
          />
          <div className="about">
            <h4>{openedconversation.conversation_name.join(",")}</h4>
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
  const { getmessages, openedconversation, getSocket, user } = useContext(
    ChatContext
  );

  const socket = getSocket(openedconversation.conversation_id)[0].socket;
  const [messages, setmessages] = useState();

  useEffect(() => {
    (async () => {
      setmessages(await getmessages(openedconversation.conversation_id));
      const list = document.querySelector(".chat-screen");
      list.scrollTop = list.scrollHeight;
    })();
  }, [openedconversation, getmessages]);

  
  socket.on("message", async(message) => {
      setmessages(await getmessages(openedconversation.conversation_id));
      const list = document.querySelector(".chat-screen");
      list.scrollTop = list.scrollHeight;
  });

  let message = "";

  const onchange = (e) => {
    message = e.target.value;
  };

  const sendmessage = () => {
    socket.emit("message", {
      message,
      sender_id: user.userid,
      conversation_id: openedconversation.conversation_id,
    });
    const messageInput = document.querySelector(".message-input textarea");
    messageInput.value = "";
  };

  return (
    <div className="messages-container">
      <div className="messages-view">
        {messages &&
          messages.map((message, i) => (
            <Message
              key={i}
              text={message.message}
              sender_id={message.sender_id}
            />
          ))}
      </div>

      <div className="message-input">
        <textarea
          onChange={onchange}
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
  type = "message",
  text = "this is a test message too",
  sender_id,
}) => {
  const { user } = useContext(ChatContext);

  if (type === "message") {
    return (
      <div className="message" id={(user.userid === sender_id) ? "sent-message" : "message"}>
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
