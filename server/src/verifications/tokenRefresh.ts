const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_ACCESS_TOKEN_URL = process.env.GOOGLE_ACCESS_TOKEN_URL as string;

const tokenRefresh = async (refreshToken: string) => {
  interface TokenRefreshProp {
    client_id: string | undefined;
    client_secret: string | undefined;
    refresh_token: string | undefined;
    grant_type: string | undefined;
  }

  const data: TokenRefreshProp = {
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  };

  try {
    const refresh_token_response = await fetch(GOOGLE_ACCESS_TOKEN_URL, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const refresh_token_data = await refresh_token_response.json();

    return { refresh_token_data, refresh_token_response };
  } catch (error) {
    console.error(error);
  }
};

export default tokenRefresh;
