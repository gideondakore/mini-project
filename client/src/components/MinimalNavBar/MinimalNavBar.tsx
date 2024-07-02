import React, { useEffect, useState } from "react";
import {
  isAuthenticated,
  authUserProfile,
} from "../../services/api/authService";
import ProfilePhoto from "../ProfilePhoto/ProfilePhoto";
import "./MinimalNavBar.css";
// import

const MinimalNavBar = () => {
  const [auth, setAuth] = useState<boolean>(false);
  const [pic, setPic] = useState<string>("");

  useEffect(() => {
    isAuthenticated()
      .then((authenticated) => {
        // console.log("Is Authenticated in NaveBar: ", authenticated);
        setAuth(authenticated);
      })
      .catch((error) => console.error("Authentication check failed:", error));

    if (auth) {
      authUserProfile()
        .then((picUrl) => {
          setPic(picUrl?.picture);
        })
        .catch((error) => console.error(`Error fetching pic: ${error}`));
    }
  });

  return (
    <>
      <div className="nav-bar">
        <div
          className="site-icon--wrapper"
          onClick={() => (window.location.href = "http://localhost:3000")}
          style={{ cursor: "pointer" }}
        >
          <img
            src={require("../../assets/images/app-logo.jpg")}
            alt="app logo"
            height={50}
            width={50}
            style={{ borderRadius: "50%" }}
          />
          <p>Duplex</p>
        </div>
        <div className="minimal-nav--container">
          {auth ? (
            <ProfilePhoto profileUrl={pic} />
          ) : (
            <ProfilePhoto profileUrl={""} />
          )}
        </div>
      </div>
    </>
  );
};

export default MinimalNavBar;
