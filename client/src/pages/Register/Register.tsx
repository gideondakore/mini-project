import React from "react";
import loginLogo from "../../assets/images/login-svg.svg";
import gLogo from "../../assets/images/google-svg.svg";
import fbLogo from "../../assets/images/facebook-svg.svg";
import xLogo from "../../assets/images/twitter-x.svg";
import "./Register.css";
const Register = () => {
  return (
    <div className="mainWrapper">
      <main className="mainContainer">
        <div className="form_logo">
          <img width="50px" height="50px" src={loginLogo} alt="login" />
        </div>
        <section className="login_section">
          <h3 className="login_title">login now</h3>
          <form id="form">
            <div id="grid-form">
              <label htmlFor="fullname" className="fullname">
                Full name
              </label>
              <input
                className="fullname"
                type="text"
                placeholder="Full name"
                required
              />
              <label htmlFor="email" className="email">
                Email
              </label>
              <input
                className="email"
                type="text"
                placeholder="Enter your email"
                required
              />
              <label htmlFor="birthDate" className="birthDate">
                Birth date
              </label>
              <input className="birthDate" type="date" required />
              <label htmlFor="password" className="password">
                Password
              </label>
              <input
                className="password"
                type="password"
                placeholder="Enter your password"
                required
              />
              <label htmlFor="confirmPassword" className="confirmPassword">
                Confirm password
              </label>
              <input
                className="confirmPassword"
                type="password"
                placeholder="Confirm password"
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
                      <img src={gLogo} alt="google logo" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={fbLogo} alt="facebook logo" />
                    </a>
                  </li>
                  <li>
                    <a href="https://x.com" target="_blank" rel="noreferrer">
                      <img src={xLogo} alt="x logo" />
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
