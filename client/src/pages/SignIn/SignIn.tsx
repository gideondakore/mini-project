import React, { useEffect, useState } from "react";
import loginLogo from "../../assets/images/login-svg.svg";
import gLogo from "../../assets/images/google-svg.svg";
import fbLogo from "../../assets/images/facebook-svg.svg";
import xLogo from "../../assets/images/twitter-x.svg";
import "./SignIn.css";
import { aouthLogin } from "../../services/api/authService";

const SignIn = () => {
  const [oAuthType, setOauthType] = useState<string>("");

  useEffect(() => {
    if (oAuthType === "google") {
      aouthLogin();
    }
  }, [oAuthType]);

  return (
    <div className="mainWrapperSignIn">
      <main className="mainContainerSignIn">
        <div className="form_logo-signin">
          <img width="50px" height="50px" src={loginLogo} alt="login" />
        </div>

        <section className="login_section-signin">
          <h3 className="login_title-signin">login now</h3>

          <form id="form">
            <div id="grid-form-signin">
              <label htmlFor="email" className="email-signin">
                Email
              </label>
              <input
                className="email-signin"
                type="text"
                placeholder="Enter your email"
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
                  <li>
                    <button type="button">
                      <img src={fbLogo} alt="facebook logo" />
                    </button>
                  </li>
                  <li>
                    <button type="button">
                      <img src={xLogo} alt="x logo" />
                    </button>
                  </li>
                </ul>
              </div>

              <div id="signup-signin">
                <p>Doesn't have an account yet?</p>
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
