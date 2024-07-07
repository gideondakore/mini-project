import React, { useEffect, useState } from "react";
import "./AuthPage.css";
import axios from "axios";

const AuthPage = (props) => {
  const [userName, setUserName] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    const { value } = e.target[0];
    axios
      .post("http://localhost:8000/authenticate", {
        username: value.toLowerCase(),
      })
      .then((r) => props.onAuth({ ...r.data, secret: value }))
      .catch((e) => console.log("error", e));
  };

  useEffect(() => {
    const storedUserName = window.localStorage.getItem("chat_user_name");
    setUserName(storedUserName);

    // if (!storedUserName) {
    //   if (!storedUserName) {
    //     window.location.href = "http://localhost:3000/register";
    //   }
    // }
  }, [window.localStorage]);

  return (
    <div className="auth-container">
      <div className="background-auth">
        <form onSubmit={onSubmit} className="form-card">
          <div className="form-title">Welcome 👋</div>

          <div className="form-subtitle">Set a username to get started</div>

          <div className="auth">
            <div className="auth-label">Username</div>
            <input
              className="auth-input"
              name="username"
              value={userName}
              onChange={({ target }) => setUserName(target?.value)}
            />
            <button className="auth-button" type="submit">
              Enter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
