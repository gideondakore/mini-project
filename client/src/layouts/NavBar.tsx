import React, { useEffect, useState } from "react";
import "../assets/styles/NavBar.css";
import {
  RegisterBtn,
  SignInBtn,
  SignOutBtn,
  SearchAreaInput,
} from "../components";
import { StylesProvider } from "../context/NavBarStyleContext";
import styles from "../assets/styles/RegisterSignIn.module.css";
import { GoQuestion } from "react-icons/go";
// import { SearchAreaInput } from "../components";
import { isAuthenticated } from "../services/api/authService";

const NavBar = () => {
  const [auth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    isAuthenticated()
      .then((authenticated) => {
        console.log("Authenticated:", authenticated);
        setAuth(authenticated);
      })
      .catch((error) => console.error("Authentication check failed:", error));
  }, []);

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
            {auth ? (
              <SignOutBtn />
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
