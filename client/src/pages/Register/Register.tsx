import React, { ReactNode, useEffect, useState } from "react";
import loginLogo from "../../assets/images/login-svg.svg";
import gLogo from "../../assets/images/google-svg.svg";
import "./Register.css";
import { aouthLogin, isAuthenticated } from "../../services/api/authService";
import checkPasswordValidity from "../../utils/Validations/passwordValidity";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import generateUsername from "../../utils/generateUsername";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { setChatUSerName } from "../../store/features/chatUserNameSlice";
import { setRememberUser } from "../../store/features/rememberUserInputSlice";
import { useSelector } from "react-redux";

const Register = () => {
  const [oAuthType, setOauthType] = useState<string>("");
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [validEmailInput, setValidEmailInput] = useState<boolean>(false);
  const [validNameInput, setValidNameInput] = useState<boolean>(false);

  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<Array<string | undefined>>([]);
  const [success, setSuccess] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const rememberUserInput = useSelector(
    (state: RootState) => state.rememberUserInput.remember_user
  );
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (errors.length > 0) {
      errors.map((error) => toast(error));
    } else {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_LOCAL_HOST_SERVER}/api/send-verification-email`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              fullname,
              email,
              birthDate,
              password,
              confirmPassword,
            }),
          }
        );

        if (!response.ok) {
          toast("Error sending request to email");
          return;
        }

        const { message, success } = await response.json();
        if (success) {
          if (isChecked) {
            const rememberUserInputObj = {
              name: fullname,
              email: email,
              birth_day: birthDate,
              password: password,
            };
            dispatch(setRememberUser({ remember_user: rememberUserInputObj }));
          }

          const userName = generateUsername(fullname);
          dispatch(setChatUSerName(userName));

          window.location.href = `${process.env.REACT_APP_LOCAL_HOST_CLIENT}/email-sent`;
          return;
        } else {
          setErrorMsg(message);
          setSuccess(success);
          return;
        }
      } catch (error) {
        toast("Ooops! An error occur. Try again!");
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

    const validateName = () => {
      const validNameRegex =
        /^[A-Za-z]+(?:[-'\s][A-Za-z]+)* [A-Za-z]+(?:[-'\s][A-Za-z]+)*$/;
      if (validNameRegex.test(fullname)) {
        setValidNameInput(true);
      } else {
        setValidNameInput(false);
      }
    };

    const validateEmail = () => {
      const validEmailRegex =
        /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
      if (validEmailRegex.test(email)) {
        setValidEmailInput(true);
      } else {
        setValidEmailInput(false);
      }
    };

    const validatePassword = () => {
      const errMsgs: string[] = checkPasswordValidity(password);
      setErrors(errMsgs);
    };

    validateName();
    validateEmail();
    validatePassword();

    const errorMsgs: string[] = [];
    if (!validEmailInput) {
      errorMsgs.push("Invalid email");
    }
    if (!validNameInput) {
      errorMsgs.push("Please provide your full name");
    }
    if (password !== confirmPassword) {
      errorMsgs.push("Password must be the same");
    }
    setErrors(errorMsgs);

    setSuccess(success);
  }, [
    success,
    email,
    oAuthType,
    password,
    confirmPassword,
    fullname,
    validEmailInput,
    validNameInput,
  ]);

  useEffect(() => {
    if (oAuthType === "google") {
      aouthLogin();
    }
  }, [oAuthType]);

  useEffect(() => {
    const handleDOMContentLoaded = () => {
      isAuthenticated()
        .then((authenticated) => {
          authenticated &&
            (window.location.href = `${process.env.REACT_APP_LOCAL_HOST_CLIENT}?register_msg=You're already registered`);
        })
        .catch((error) => console.error("Authentication check failed:", error));
    };

    window.addEventListener("DOMContentLoaded", handleDOMContentLoaded);

    return () =>
      window.removeEventListener("DOMContentLoaded", handleDOMContentLoaded);
  }, []);

  useEffect(() => {
    if (rememberUserInput) {
      if (rememberUserInput.name)
        setFullname(rememberUserInput.name ? rememberUserInput.name : "");
      setEmail(rememberUserInput.email ? rememberUserInput.email : "");
      setBirthDate(
        rememberUserInput.birth_day ? rememberUserInput.birth_day : ""
      );
      setPassword(rememberUserInput.password ? rememberUserInput.password : "");
      setConfirmPassword(
        rememberUserInput.password ? rememberUserInput.password : ""
      );
    }
  }, [rememberUserInput]);

  return (
    <div className="mainWrapper">
      <main
        className="mainContainer"
        style={isLoading ? { opacity: "0.5" } : { opacity: "1" }}
      >
        {errorMsg &&
          Array.isArray(errorMsg) &&
          (errorMsg as ReactNode[]).map((err) => toast(err))}
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
                      type="button"
                    >
                      <img src={gLogo} alt="google logo" />
                    </button>
                  </li>
                </ul>
              </div>
              <div id="signup">
                <p>Already have an account?</p>
                <a href={`${process.env.REACT_APP_LOCAL_HOST_CLIENT}/signin`}>
                  sign in
                </a>
              </div>
            </footer>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Register;
