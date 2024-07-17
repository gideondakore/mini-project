import React, { useEffect, useState } from "react";
import "./NavBar.css";
import {
  RegisterBtn,
  SignInBtn,
  SignOutBtn,
  //   SearchAreaInput,
  ProfilePhoto,
} from "../../components";
import { StylesProvider } from "../../context/NavBarStyleContext";
import styles from "../../assets/styles/RegisterSignIn.module.css";
import { GoQuestion } from "react-icons/go";
import {
  isAuthenticated,
  authUserProfile,
} from "../../services/api/authService";

const NavBar = () => {
  const [auth, setAuth] = useState<boolean>(false);
  const [pic, setPic] = useState<string>("");

  useEffect(() => {
    isAuthenticated()
      .then((authenticated) => {
        setAuth(authenticated);
      })
      .catch((error) => console.error("Authentication check failed:", error));

    if (auth) {
      authUserProfile()
        .then((user) => {
          setPic(user.user?.picture);
        })
        .catch((error) => console.error(`Error fetching pic: ${error}`));
    }
  });

  return (
    <>
      <div className="nav-bar">
        <StylesProvider styles={styles}>
          <div
            className="site-icon--wrapper"
            onClick={() =>
              (window.location.href = `${process.env.REACT_APP_LOCAL_HOST_CLIENT}`)
            }
            style={{ cursor: "pointer" }}
          >
            <img
              src={require("../../assets/images/app-logo.jpg")}
              alt="app logo"
              height={50}
              width={50}
              style={{ borderRadius: "50%" }}
            />
            <p>Duplex</p>
          </div>
          <div className={styles.registerSignInBtnWrapper}>
            <GoQuestion
              className={styles.customerService}
              style={{ color: "#222f36", fontSize: "1.8rem" }}
              title="Contact customer service"
            />
            {auth ? (
              <>
                <SignOutBtn />
                <ProfilePhoto profileUrl={pic} />
              </>
            ) : (
              <>
                <RegisterBtn />
                <SignInBtn />
              </>
            )}
          </div>
        </StylesProvider>
      </div>
    </>
  );
};

export default NavBar;
