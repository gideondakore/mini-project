import React from "react";
import { useStyles } from "../../context/NavBarStyleContext";

const SignOutBtn = () => {
  const ngrok_forward_uri = "https://1e3d-154-161-15-37.ngrok-free.app";

  const handleClick = async () => {
    try {
      const response = await fetch(`${ngrok_forward_uri}/api/test`, {
        credentials: "omit",
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
    <div className={styles.registerSignOutBtnContainer}>
      <button className={styles.registerSignOutBtn} onClick={handleClick}>
        Sign out
      </button>
    </div>
  );
};

export default SignOutBtn;
