import React, { useEffect } from "react";

const UserInfo = () => {
  const GOOGLE_OAUTH_URL = process.env.REACT_APP_GOOGLE_OAUTH_URL;
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const GOOGLE_CALLBACK_URL = "http%3A//localhost:8000/google/callback";
  const GOOGLE_OAUTH_SCOPES = [
    "https%3A//www.googleapis.com/auth/userinfo.email",
    "https%3A//www.googleapis.com/auth/userinfo.profile",
  ];
  useEffect(() => {
    const state = "some_state";
    const scopes = GOOGLE_OAUTH_SCOPES.join(" ");
    const GOOGLE_OAUTH_CONSENT_SCREEN_URL = `${GOOGLE_OAUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_CALLBACK_URL}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`;
    console.log(
      "GOOGLE_OAUTH_CONSENT_SCREEN_URL: ",
      GOOGLE_OAUTH_URL,
      GOOGLE_CLIENT_ID
    );
    window.location.href = GOOGLE_OAUTH_CONSENT_SCREEN_URL;
  });

  return (
    <div>
      <p>Redirecting to Google OAuth...</p>
    </div>
  );
};

export default UserInfo;
