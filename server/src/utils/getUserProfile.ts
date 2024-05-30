import verifyAccessToken from "../verifications/verifyAccessToken";
const getUserProfile = (token: string) => {
  try {
    const userProfile = verifyAccessToken(token);
    return userProfile;
  } catch (error) {
    console.error("Error fetching user profile");
  }
};

export default getUserProfile;
