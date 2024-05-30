import getToken from "../../utils/getToken";
const aouthLogin = async () => {
  const GOOGLE_OAUTH_URL = process.env.REACT_APP_GOOGLE_OAUTH_URL;
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const GOOGLE_CALLBACK_URI = `http://localhost:8000/google/callback`;
  const GOOGLE_OAUTH_SCOPES = [
    "https%3A//www.googleapis.com/auth/userinfo.email",
    "https%3A//www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/user.birthday.read",
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
  const { credential_access_token, credential_refresh_token } = getToken();

  try {
    const response = await fetch(
      `http://localhost:8000/authentication-status`,
      {
        headers: new Headers({
          "ngrok-skip-browser-warning": "12345",
          Authorization: `Bearer ${credential_access_token},${credential_refresh_token}`,
        }),
        credentials: "include",
      }
    );

    if (!response?.ok) {
      return response?.ok;
    }

    const { authenticated } = await response.json();
    return authenticated;
  } catch (error) {
    throw new Error(`Error checking for authentication status: ${error}`);
  }
};

const authLogout = async () => {
  try {
    const response = await fetch(`http://localhost:8000/oauth-logout`, {
      headers: new Headers({
        "ngrok-skip-browser-warning": "12345",
      }),
      credentials: "include",
    });

    const { msg, status } = await response.json();

    console.log(msg, status);
    return status;
  } catch (error) {
    throw new Error(`Error occur logging out: ${error}`);
  }
};

const authUserProfile = async () => {
  try {
    const response = await fetch("http://localhost:8000/user-profile", {
      headers: new Headers({
        "ngrok-skip-browser-warning": "12345",
      }),
      credentials: "include",
    });

    if (!response?.ok) {
      console.error("Error fetching user profile");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Network error: ${error}`);
  }
};
export { aouthLogin, isAuthenticated, authLogout, authUserProfile };
