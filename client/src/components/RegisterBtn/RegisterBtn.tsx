import React from "react";
import { useStyles } from "../../context/NavBarStyleContext";
// import { Register } from "../../pages";
// import "./RegisterBtn.css";

const RegisterBtn = () => {
  const handleRegister = () => {
    const registerUrl = "http://localhost:3000/register";
    window.location.href = registerUrl;
  };
  const styles = useStyles();
  return (
    <div className={styles.registerSignInBtnContainer}>
      <button
        type="button"
        className={styles.registerSignInBtn}
        onClick={handleRegister}
      >
        Register
      </button>
    </div>
  );
};

export default RegisterBtn;
