import React, { useEffect, useState } from "react";
import "./AuthPage.css";
import axios from "axios";
import { isAuthenticated } from "../../services/api/authService";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";

const AuthPage = (props) => {
  const [userName, setUserName] = useState("");
  const [auth, setAuth] = useState(false);

  const chat_user_name = useSelector(
    (state) => state.chatUserName.chat_user_name
  );

  const onSubmit = (e) => {
    e.preventDefault();
    const { value } = e.target[0];
    axios
      .post(`${process.env.REACT_APP_LOCAL_HOST_SERVER}/authenticate`, {
        username: value.toLowerCase(),
      })
      .then((r) => props.onAuth({ ...r.data, secret: value }))
      .catch((e) => console.log("error", e));
  };

  useEffect(() => {
    setUserName(chat_user_name);
  }, [chat_user_name]);

  useEffect(() => {
    isAuthenticated()
      .then((authenticated) => {
        setAuth(authenticated);
      })
      .catch((error) => console.error("Authentication check failed:", error));
  });
  return (
    <div className="auth-container">
      <ToastContainer />
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
              readOnly
            />
            {userName && auth && userName.length >= 3 ? (
              <button className="auth-button" type="submit">
                Enter
              </button>
            ) : (
              <button
                className="auth-button"
                type="button"
                // style={{ cursor: "not-allowed" }}
                onClick={() => {
                  toast("Please login to access the chat! 🥹", {
                    type: "info",
                    theme: "light",
                  });
                }}
              >
                Enter
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
