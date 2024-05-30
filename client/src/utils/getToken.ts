const getToken = () => {
  const access = window.localStorage.getItem("credential_access_token");
  const refresh = window.localStorage.getItem("credential_refresh_token");

  const tokens = {
    credential_access_token: access,
    credential_refresh_token: refresh,
  };
  return tokens;
};

export default getToken;
