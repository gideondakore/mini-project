import React from "react";
import { useStyles } from "../../context/NavBarStyleContext";
// import "./SignInBtn.css";
const SignInBtn = () => {
  const styles = useStyles();
  return (
    <div className={styles.registerSignInBtnContainer}>
      <button className={styles.registerSignInBtn}>Sign in</button>
    </div>
  );
};

export default SignInBtn;
