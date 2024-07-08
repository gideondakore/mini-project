import React, { useEffect, useState } from "react";
import "./AuthPage.css";
import axios from "axios";
import { isAuthenticated } from "../../services/api/authService";
import { ToastContainer, toast } from "react-toastify";

const AuthPage = (props) => {
  const [userName, setUserName] = useState("");
  const [auth, setAuth] = useState(false);

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
  }, [window.localStorage]);

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
