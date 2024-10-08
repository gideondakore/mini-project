import React from "react";
import { useStyles } from "../../context/NavBarStyleContext";

const RegisterBtn = () => {
  const handleRegister = () => {
    const registerUrl = `${process.env.REACT_APP_LOCAL_HOST_CLIENT}/register`;
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
