import React, { useEffect, useState } from "react";
import { useStyles } from "../../context/NavBarStyleContext";
import { authLogout } from "../../services/api/authService";

const SignOutBtn = () => {
  const [status, setStatus] = useState<number>(500);
  const handleClick = () => {
    authLogout()
      .then((status) => setStatus(status))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (status === 200) {
      window.location.reload();
    }
  }, [status]);

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
