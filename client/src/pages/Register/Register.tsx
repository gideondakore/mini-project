import React from "react";
import "./Register.css";
const Register = () => {
  return (
    <div className="container">
      <main>
        <div className="form_logo">
          <img
            width="50px"
            height="50px"
            src="../../assets/images/login-svg.svg"
            alt="login"
          />
        </div>
        <section className="login_section">
          <h3 className="login_title">login now</h3>
          <form id="form">
            <div id="grid-form">
              <label htmlFor="email" className="email">
                email
              </label>
              <input
                className="email"
                type="text"
                placeholder="Enter your email"
                required
              />
              <div id="passForgot">
                <label htmlFor="password" className="password">
                  password{" "}
                </label>
                <a className="passForgot" href="/">
                  forgot password?
                </a>
              </div>

              <input
                className="password"
                type="password"
                placeholder="Enter your password"
                required
              />
              <div className="remember-check">
                <input type="checkbox" className="btnCheck" />
                <label className="btnLabel">Remember me </label>
              </div>
              <button type="submit" className="login_button">
                login
              </button>
            </div>
            <footer>
              <div id="sign_title">
                <hr className="hrLeft" />
                <p>or sign up using</p>
                <hr className="hrRight" />
              </div>
              <div id="providers">
                <ul id="providers-list">
                  <li>
                    <a
                      href="https://google.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="../../assets/images/google-svg.svg"
                        alt="google logo"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="../../assets/images/facebook-svg.svg"
                        alt="facebook logo"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="https://x.com" target="_blank" rel="noreferrer">
                      <img
                        src="../../assets/images/twitter-x.svg"
                        alt="x logo"
                      />
                    </a>
                  </li>
                </ul>
              </div>
              <div id="signup">
                <p>Doesn't have an account yet?</p>
                <a href="/register.html">sign up</a>
              </div>
            </footer>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Register;
