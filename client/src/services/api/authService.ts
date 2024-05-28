// import axios from "axios";

const ngrok_forward_uri = "https://1e3d-154-161-15-37.ngrok-free.app";

const aouthLogin = async () => {
  const GOOGLE_OAUTH_URL = process.env.REACT_APP_GOOGLE_OAUTH_URL;
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const GOOGLE_CALLBACK_URI = `http://localhost:8000/google/callback`;
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

const isAuthenticated = async () => {
  try {
    const response = await fetch(
      `http://localhost:8000/authentication-status`,
      {
        headers: new Headers({
          "ngrok-skip-browser-warning": "12345",
        }),
        credentials: "include",
      }
    );

    if (!response?.ok) {
      return response?.ok;
    }

    const { authenticated } = await response.json();
    console.log("Response Body: ", authenticated);
    return authenticated;
  } catch (error) {
    throw new Error(`Error checking for authentication status: ${error}`);
  }
};

const authLogout = async () => {
  try {
    const response = await fetch(`${ngrok_forward_uri}/oauth-logout`, {
      credentials: "include",
    });

    if (!response.ok) {
      console.error("Error response from server");
    }

    const data = await response.json();

    console.log(data);
  } catch (error) {}
};
export { aouthLogin, isAuthenticated, authLogout };
