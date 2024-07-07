import React, { useEffect, useState } from "react";
import loginLogo from "../../assets/images/login-svg.svg";
import gLogo from "../../assets/images/google-svg.svg";
import "./SignIn.css";
import { aouthLogin, signIn } from "../../services/api/authService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const [oAuthType, setOauthType] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<Array<string>>([""]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn({ email, password })
      .then((data) => {
        const { message, success, access_token, refresh_token } = data;
        if (success) {
          window.localStorage.setItem("credential_access_token", access_token);
          window.localStorage.setItem(
            "credential_refresh_token",
            refresh_token
          );
          errorMsg.map((err) => toast(err));
          window.location.href = "http://localhost:3000";
        } else {
          setErrorMsg(message);
          errorMsg.map((err) => toast(err));
        }
      })
      .catch((error) => {
        console.error("Ooops! can't sign in", error);
        setErrorMsg(["Ooops! can't sign in"]);
      });
  };

  useEffect(() => {
    if (oAuthType === "google") {
      aouthLogin();
    }
  }, [oAuthType]);

  return (
    <div className="mainWrapperSignIn">
      <main className="mainContainerSignIn">
        <ToastContainer />
        <div className="form_logo-signin">
          <img width="50px" height="50px" src={loginLogo} alt="login" />
        </div>
        <section className="login_section-signin">
          <h3 className="login_title-signin">login now</h3>

          <form id="form" onSubmit={handleSubmit}>
            <div id="grid-form-signin">
              <label htmlFor="email" className="email-signin">
                Email
              </label>
              <input
                className="email-signin"
                type="text"
                placeholder="Enter your email"
                onChange={({ target }) => setEmail(target?.value)}
                required
              />

              <div id="passForgot-signin">
                <label htmlFor="password" className="password-signin">
                  password{" "}
                </label>
                <a className="passForgot-signin" href="/">
                  forgot password?
                </a>
              </div>

              <input
                className="password-signin"
                type="password"
                placeholder="Enter your password"
                onChange={({ target }) => setPassword(target?.value)}
                required
              />

              <div className="remember-check-signin">
                <input type="checkbox" className="btnCheck-signin" />
                <label className="btnLabel">Remember me </label>
              </div>

              <button type="submit" className="login_button-signin">
                login
              </button>
            </div>

            <footer>
              <div id="sign_title-signin">
                <hr className="hrLeft-signin" />
                <p>or sign up using</p>
                <hr className="hrRight-signin" />
              </div>

              <div id="providers-signin">
                <ul id="providers-list-signin">
                  <li>
                    <button
                      onClick={() => {
                        setOauthType("google");
                      }}
                      type="button"
                    >
                      <img src={gLogo} alt="google logo" />
                    </button>
                  </li>
                </ul>
              </div>

              <div id="signup-signin">
                <p>{"Doesn't have an account yet?"}</p>
                <a href="/register">sign up</a>
              </div>
            </footer>
          </form>
        </section>
      </main>
    </div>
  );
};

export default SignIn;
