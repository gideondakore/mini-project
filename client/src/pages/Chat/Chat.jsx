import { useState } from "react";
import "./Chat.css";
import AuthPage from "../../components/AuthPage/AuthPage";
import ChatsPage from "../../components/ChatsPage/ChatsPage";

function Chat() {
  const [user, setUser] = useState(undefined);

  if (!user) {
    return <AuthPage onAuth={(user) => setUser(user)} />;
  } else {
    return <ChatsPage user={user} />;
  }
}

export default Chat;
