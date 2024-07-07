import React, { useEffect } from "react";
// import {
//   MultiChatSocket,
//   MultiChatWindow,
//   useMultiChatLogic,
//   ChatForm,
// } from "react-chat-engine-advanced";
import { PrettyChatWindow } from "react-chat-engine-pretty";
import "./ChatsPage.css";
const ChatsPage = (prop) => {
  // const chatProp = useMultiChatLogic(
  //   "19d56384-8ec9-41a1-8f1a-1ec8ab5dd1dc",
  //   prop.user.username,
  //   prop.user.secret
  // );

  useEffect(() => {
    // Wait until the ChatEngine component has rendered
    const intervalPlaceholder = setInterval(() => {
      const chatInput = document.querySelector("#react-select-3-placeholder");
      if (chatInput) {
        chatInput.innerHTML = "Type the hostel name here to start chatting";
      }
    }, 100);

    const intervalValueToLowerCase = setInterval(() => {
      const chatInput = document.querySelector("#react-select-3-input");
      if (chatInput) {
        chatInput.value = chatInput.value.toLowerCase();
      }
    }, 100);
  }, []);
  return (
    <div className="chat-container">
      <div className="chat-wrapper">
        {/* <MultiChatSocket {...chatProp} />
        <MultiChatWindow {...chatProp} style={{ height: "100%" }} /> */}

        <PrettyChatWindow
          projectId={process.env.REACT_APP_CHATENGINE_IO_ID}
          username={prop.user.username}
          secret={prop.user.secret}
        />
        {/* <Input label="Send a message..." /> */}
      </div>
    </div>
  );
};

export default ChatsPage;
