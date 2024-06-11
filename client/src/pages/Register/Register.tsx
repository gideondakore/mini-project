import React, { ReactNode, useEffect, useState } from "react";
import loginLogo from "../../assets/images/login-svg.svg";
import gLogo from "../../assets/images/google-svg.svg";
import "./Register.css";
import { aouthLogin } from "../../services/api/authService";
import checkPasswordValidity from "../../utils/Validations/passwordValidity";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const [oAuthType, setOauthType] = useState<string>("");
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [validInput, setValidInput] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<Array<string | undefined>>([]);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (errors.length > 0) {
      errors.map((error) => toast(error));
    } else {
      setIsLoading(true);
      try {
        const response = await fetch(
          "http://localhost:8000/credential-register",
          {
            method: "POST",
            headers: new Headers({
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "12345",
            }),
            body: JSON.stringify({
              fullname,
              email,
              birthDate,
              password,
              confirmPassword,
            }),
            credentials: "include",
          }
        );

        if (!response) {
          throw new Error("Failed to submit data, please try again!");
        }

        const {
          message,
          success,
          credential_access_token,
          credential_refresh_token,
        } = await response.json();

        window.localStorage.setItem(
          "credential_access_token",
          credential_access_token
        );
        window.localStorage.setItem(
          "credential_refresh_token",
          credential_refresh_token
        );
        if (!success) {
          setErrorMsg(message);
          setSuccess(success);
          return;
        }

        window.location.href = "http://localhost:3000";
      } catch (error) {
        throw new Error(`Error: ${error}`);
      } finally {
        setIsLoading(false);
        if (success) {
          setFullname("");
          setEmail("");
          setBirthDate("");
          setPassword("");
        }
      }
    }
  };
  useEffect(() => {
    if (oAuthType === "google") {
      aouthLogin();
    }

    const msgStr: string = `Invalid email`;
    const confirmPasswordFail = "Password must be the same";

    const emailValidity = () => {
      const validEmailRegex =
        /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
      if (validEmailRegex.test(email)) {
        setValidInput(true);
      } else {
        setValidInput(false);
      }
    };
    emailValidity();

    const passValidity = () => {
      const errMsgs: string[] = checkPasswordValidity(password);
      setErrors(errMsgs);
    };
    passValidity();

    if (!validInput) {
      if (password !== confirmPassword) {
        setErrors((prev) => [confirmPasswordFail, ...prev]);
      }
      setErrors((prev) => [msgStr, ...prev]);
    }

    setSuccess(success);
  }, [success, email, oAuthType, password, validInput, confirmPassword]);

  return (
    <div className="mainWrapper">
      <main
        className="mainContainer"
        style={isLoading ? { opacity: "0.5" } : { opacity: "1" }}
      >
        {errorMsg && (errorMsg as ReactNode[]).map((err, index) => toast(err))}
        <ToastContainer />
        <div className="form_logo">
          <img width="50px" height="50px" src={loginLogo} alt="login" />
        </div>
        <section className="login_section">
          <h3 className="login_title">login now</h3>
          <form id="form" onSubmit={handleSubmit}>
            <div id="grid-form">
              <label htmlFor="fullname" className="fullname">
                Full name
              </label>
              <input
                value={fullname}
                onChange={({ target }) => {
                  setFullname(target?.value);
                }}
                className="fullname"
                type="text"
                placeholder="Full name"
                required
              />

              <label htmlFor="email" className="email">
                Email
              </label>
              <input
                value={email}
                onChange={({ target }) => {
                  setEmail(target?.value);
                }}
                className="email"
                type="text"
                placeholder="Enter your email"
                required
              />

              <label htmlFor="birthDate" className="birthDate">
                Birth date
              </label>
              <input
                value={birthDate}
                onChange={({ target }) => {
                  setBirthDate(target?.value);
                }}
                className="birthDate"
                type="date"
                required
              />

              <label htmlFor="password" className="password">
                Password
              </label>

              <input
                value={password}
                onChange={({ target }) => {
                  setPassword(target?.value);
                }}
                className="password"
                type="password"
                placeholder="Enter your password"
                required
              />

              <label htmlFor="confirmPassword" className="confirmPassword">
                Confirm password
              </label>
              <input
                value={confirmPassword}
                onChange={({ target }) => {
                  setConfirmPassword(target?.value);
                }}
                className="confirmPassword"
                type="password"
                placeholder="Confirm password"
                required
              />

              <div className="remember-check">
                <input
                  type="checkbox"
                  className="btnCheck"
                  value="remember"
                  checked={isChecked}
                  onChange={({ target }) => {
                    setIsChecked(target?.checked);
                  }}
                />
                <label className="btnLabel">Remember me </label>
              </div>

              <button
                type="submit"
                className="login_button"
                style={{
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                register
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
                    <button
                      onClick={() => {
                        setOauthType("google");
                      }}
                      // disabled
                      type="button"
                    >
                      <img src={gLogo} alt="google logo" />
                    </button>
                  </li>
                </ul>
              </div>
              <div id="signup">
                <p>Already have an account?</p>
                <a href="/register.html">sign in</a>
              </div>
            </footer>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Register;
