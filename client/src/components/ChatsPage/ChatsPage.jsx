import React, { useEffect } from "react";

import { PrettyChatWindow } from "react-chat-engine-pretty";
import "./ChatsPage.css";
const ChatsPage = (prop) => {
  useEffect(() => {
    // const intervalPlaceholder = setInterval(() => {
    //   const chatInput = document.querySelector("#react-select-3-placeholder");
    //   if (chatInput) {
    //     chatInput.innerHTML = "Type the hostel name here to start chatting";
    //   }
    // }, 100);
    // const intervalValueToLowerCase = setInterval(() => {
    //   const chatInput = document.querySelector("#react-select-3-input");
    //   if (chatInput) {
    //     chatInput.value = chatInput.value.toLowerCase();
    //   }
    // }, 100);
    // return (() => clearTimeout)
  }, []);
  return (
    <div className="chat-container">
      <div className="chat-wrapper">
        <PrettyChatWindow
          projectId={process.env.REACT_APP_CHATENGINE_IO_ID}
          username={prop.user.username}
          secret={prop.user.secret}
        />
      </div>
    </div>
  );
};

export default ChatsPage;
