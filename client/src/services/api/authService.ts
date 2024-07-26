import getToken from "../../utils/getToken";
import generateUsername from "../../utils/generateUsername";

const aouthLogin = async () => {
  const GOOGLE_OAUTH_URL = process.env.REACT_APP_GOOGLE_OAUTH_URL;
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const GOOGLE_CALLBACK_URI = `${process.env.REACT_APP_LOCAL_HOST_SERVER}/google/callback`;
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

// const aouthLogin = async () => {
//   const GOOGLE_OAUTH_URL = process.env.REACT_APP_GOOGLE_OAUTH_URL;
//   const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

//   const GOOGLE_CALLBACK_URI = `${process.env.REACT_APP_LOCAL_HOST_SERVER}/google/callback`;
//   const GOOGLE_OAUTH_SCOPES = [
//     "https://www.googleapis.com/auth/userinfo.email",
//     "https://www.googleapis.com/auth/userinfo.profile",
//   ];

//   try {
//     const state = "some_state";
//     const scopes = encodeURIComponent(GOOGLE_OAUTH_SCOPES.join(" "));
//     const GOOGLE_OAUTH_CONSENT_SCREEN = `${GOOGLE_OAUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_CALLBACK_URI}&access_type=offline&response_type=code&state=${state}&scope=${scopes}&prompt=consent`;
//     window.location.href = GOOGLE_OAUTH_CONSENT_SCREEN;
//   } catch (err) {
//     throw new Error(`Network error: ${err}`);
//   }
// };

const isAuthenticated = async () => {
  const { credential_access_token, credential_refresh_token } = getToken();

  try {
    const response = await fetch(
      `${process.env.REACT_APP_LOCAL_HOST_SERVER}/authentication-status`,
      {
        // headers: new Headers({
        //   "Content-Type": "application/json",
        //   "ngrok-skip-browser-warning": "12345",
        //   Authorization: `Bearer ${credential_access_token},${credential_refresh_token}`,
        // }),
        headers: {
          Authorization: `Bearer ${credential_access_token},${credential_refresh_token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!response?.ok) {
      return response?.ok;
    }

    const { authenticated, credential_access, credential_refresh } =
      await response.json();

    if (credential_access && credential_refresh) {
      window.localStorage.setItem("credential_access_token", credential_access);
      window.localStorage.setItem(
        "credential_refresh_token",
        credential_refresh
      );
    }
    return authenticated;
  } catch (error) {
    throw new Error(`Error checking for authentication status: ${error}`);
  }
};

const signOut = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_LOCAL_HOST_SERVER}/signout`,
      {
        headers: new Headers({
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "12345",
        }),
        credentials: "include",
      }
    );

    const { success } = await response.json();

    if (success) {
      window.localStorage.removeItem("credential_access_token");
      window.localStorage.removeItem("credential_refresh_token");
    }

    return success;
  } catch (error) {
    throw new Error(`Error occur logging out: ${error}`);
  }
};

const signIn = async (body: { email: string; password: string }) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_LOCAL_HOST_SERVER}/signin`,
      {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        credentials: "include",
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error occur signing you in!");
  }
};
const authUserProfile = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_LOCAL_HOST_SERVER}/user-profile`,
      {
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        credentials: "include",
      }
    );

    if (!response?.ok) {
      console.error("Error fetching user profile");
    }
    const data = await response.json();
    const userName = generateUsername(data.user?.name);
    window.localStorage.setItem("chat_user_name", userName);
    return data;
  } catch (error) {
    console.error(`Network error: ${error}`);
  }
};
export { aouthLogin, isAuthenticated, signOut, signIn, authUserProfile };
