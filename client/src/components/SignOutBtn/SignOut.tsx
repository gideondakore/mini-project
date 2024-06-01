import React, { useEffect, useState } from "react";
import { useStyles } from "../../context/NavBarStyleContext";
import { signOut } from "../../services/api/authService";

const SignOutBtn = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const handleClick = () => {
    signOut()
      .then((success) => setSuccess(success))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (success) {
      window.location.reload();
    }
  }, [success]);

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
