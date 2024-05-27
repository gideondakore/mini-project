// import axios from "axios";

const aouthLogin = async () => {
  const GOOGLE_OAUTH_URL = process.env.REACT_APP_GOOGLE_OAUTH_URL;
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const GOOGLE_CALLBACK_URI = "http%3A//localhost:8000/google/callback";
  const GOOGLE_OAUTH_SCOPES = [
    "https%3A//www.googleapis.com/auth/userinfo.email",
    "https%3A//www.googleapis.com/auth/userinfo.profile",
  ];

  try {
    const state = "some_state";
    const scopes = GOOGLE_OAUTH_SCOPES.join(" ");
    const GOOGLE_OAUTH_CONSENT_SCREEN = `${GOOGLE_OAUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_CALLBACK_URI}&access_type=offline&response_type=code&state=${state}&scope=${scopes}&prompt=consent`;
    window.location.href = GOOGLE_OAUTH_CONSENT_SCREEN;
  } catch (err) {
    throw new Error(`Network error: ${err}`);
  }
};

export { aouthLogin };
