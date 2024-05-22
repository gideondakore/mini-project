import React from "react";
import "../assets/styles/NavBar.css";
import { RegisterBtn, SignInBtn } from "../components";
import { StylesProvider } from "../context/NavBarStyleContext";
import styles from "../assets/styles/RegisterSignIn.module.css";
import { GoQuestion } from "react-icons/go";
import { SearchAreaInput } from "../components";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const NavBar = () => {
  return (
    <>
      <div className="nav">
        <a href="/" className="urlTitle">
          Hostelbook.com
        </a>
        <SearchAreaInput />
        <StylesProvider styles={styles}>
          <div className={styles.registerSignInBtnWrapper}>
            <GoQuestion
              className={styles.customerService}
              style={{ color: "#222f36", fontSize: "1.8rem" }}
              title="Contact customer service"
            />
            <a className={styles.listProperty} href="/">
              List your property
            </a>
            <RegisterBtn />
            <SignInBtn />
          </div>
        </StylesProvider>
      </div>
      <Outlet />
      <Footer />
    </>
  );
};

export default NavBar;
