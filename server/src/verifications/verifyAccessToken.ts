const GOOGLE_TOKEN_INFO_URL = process.env.GOOGLE_TOKEN_INFO_URL;
const verifyAccessToken = async (token: string) => {
  try {
    const verify_access_token_response = await fetch(
      `${GOOGLE_TOKEN_INFO_URL}?access_token=${token}`
    );
    const verify_access_token_data = await verify_access_token_response.json();

    return { verify_access_token_data, verify_access_token_response };
  } catch (error) {
    console.error(error);
  }
};

export default verifyAccessToken;
