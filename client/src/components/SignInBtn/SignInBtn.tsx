import React from "react";
import { useStyles } from "../../context/NavBarStyleContext";

const SignInBtn = () => {
  const handleClick = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/test", {
        credentials: "include",
      });
      if (!response) {
        console.error("Error occur fetching data");
      }

      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.error("Network error");
    }
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
