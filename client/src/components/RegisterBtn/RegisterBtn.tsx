import React from "react";
import { useStyles } from "../../context/NavBarStyleContext";
// import "./RegisterBtn.css";

const RegisterBtn = () => {
  const styles = useStyles();
  return (
    <div className={styles.registerSignInBtnContainer}>
      <button type="button" className={styles.registerSignInBtn}>
        Register
      </button>
    </div>
  );
};

export default RegisterBtn;
