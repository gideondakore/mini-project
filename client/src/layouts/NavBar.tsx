import React from "react";
import "../assets/styles/NavBar.css";
import { RegisterBtn, SignInBtn } from "../components";
import { StylesProvider } from "../context/NavBarStyleContext";
import styles from "../assets/styles/RegisterSignIn.module.css";
import { GoQuestion } from "react-icons/go";
import { SearchAreaInput } from "../components";

const NavBar = () => {
  return (
    <>
      <div className="nav-bar">
        <SearchAreaInput />
        <StylesProvider styles={styles}>
          <div className={styles.registerSignInBtnWrapper}>
            <GoQuestion
              className={styles.customerService}
              style={{ color: "#222f36", fontSize: "1.8rem" }}
              title="Contact customer service"
            />
            <RegisterBtn />
            <SignInBtn />
          </div>
        </StylesProvider>
      </div>
    </>
  );
};

export default NavBar;
