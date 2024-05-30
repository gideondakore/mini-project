import React from "react";
import { useStyles } from "../../context/NavBarStyleContext";

const SignInBtn = () => {
  const handleClick = () => {
    const registerUrl = "http://localhost:3000/signin";
    window.location.href = registerUrl;
  };
  const styles = useStyles();
  return (
    <div className={styles.registerSignInBtnContainer}>
      <button className={styles.registerSignInBtn} onClick={handleClick}>
        Sign in
      </button>
    </div>
  );
};

export default SignInBtn;
